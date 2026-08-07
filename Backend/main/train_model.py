"""
Trains a RandomForestClassifier on a disease-symptom dataset shaped like:
Disease, Symptom_1, Symptom_2, ..., Symptom_N

Unlike TF-IDF (which weights by word frequency/rarity — wrong tool for a
fixed checklist), this uses a BINARY symptom vector: one column per known
symptom, 1 if present, 0 if absent. This matches how the data was actually
collected and gives much more reliable predictions for exact symptom input.

Produces:
  - randomforest_model.pkl
  - symptom_binarizer.pkl   (replaces tfidf_vectorizer.pkl)
  - labelEncoder.pkl
"""

import os
import pickle
import pandas as pd
from sklearn.ensemble import RandomForestClassifier
from sklearn.preprocessing import LabelEncoder, MultiLabelBinarizer
from sklearn.model_selection import train_test_split
from sklearn.metrics import classification_report

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
DATASET_PATH = os.path.join(BASE_DIR, "dataset.csv")


def normalize_symptom(s):
    """Lowercase + strip + collapse spaces, keep underscores as-is
    so tokens match exactly however the dataset formats them."""
    if pd.isna(s):
        return None
    s = str(s).strip().lower()
    s = s.replace(" ", "_")
    return s if s else None


def extract_symptom_sets(df):
    symptom_cols = [c for c in df.columns if c.lower().startswith("symptom")]
    if not symptom_cols:
        raise ValueError(
            "No columns starting with 'symptom' found. "
            "Update extract_symptom_sets() to match your column names."
        )

    def row_to_set(row):
        vals = [normalize_symptom(row[c]) for c in symptom_cols]
        return [v for v in vals if v]

    return df.apply(row_to_set, axis=1)


def main():
    df = pd.read_csv(DATASET_PATH)
    df["Disease"] = df["Disease"].str.lower().str.strip()

    df["symptom_set"] = extract_symptom_sets(df)

    # Drop rows with no symptoms at all
    df = df[df["symptom_set"].map(len) > 0].reset_index(drop=True)

    label_encoder = LabelEncoder()
    y = label_encoder.fit_transform(df["Disease"])

    # Binary symptom vector: one column per unique symptom seen in training
    binarizer = MultiLabelBinarizer()
    X = binarizer.fit_transform(df["symptom_set"])

    print(f"Rows: {len(df)}  |  Unique diseases: {len(label_encoder.classes_)}  "
          f"|  Unique symptoms: {len(binarizer.classes_)}")

    X_train, X_test, y_train, y_test = train_test_split(
        X, y, test_size=0.2, random_state=42, stratify=y
    )

    model = RandomForestClassifier(
        n_estimators=300,
        random_state=42,
        n_jobs=-1,
    )
    model.fit(X_train, y_train)

    print("\nValidation report:")
    y_pred = model.predict(X_test)
    print(
        classification_report(
            y_test,
            y_pred,
            labels=range(len(label_encoder.classes_)),
            target_names=label_encoder.classes_,
            zero_division=0,
        )
    )

    # Refit on full data before saving
    model.fit(X, y)

    with open(os.path.join(BASE_DIR, "randomforest_model.pkl"), "wb") as f:
        pickle.dump(model, f)

    with open(os.path.join(BASE_DIR, "symptom_binarizer.pkl"), "wb") as f:
        pickle.dump(binarizer, f)

    with open(os.path.join(BASE_DIR, "labelEncoder.pkl"), "wb") as f:
        pickle.dump(label_encoder, f)

    print("\nSaved: randomforest_model.pkl, symptom_binarizer.pkl, labelEncoder.pkl")

    # Quick self-check: how many unique symptoms did we learn?
    print("\nSample of known symptom vocabulary:")
    print(list(binarizer.classes_)[:15])


if __name__ == "__main__":
    main()
