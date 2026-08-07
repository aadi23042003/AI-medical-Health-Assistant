import pandas as pd
import pickle
import os

BASE_DIR = os.path.dirname(os.path.abspath(__file__))

model_path = os.path.join(BASE_DIR, "randomforest_model.pkl")
encoder_path = os.path.join(BASE_DIR, "labelEncoder.pkl")
binarizer_path = os.path.join(BASE_DIR, "symptom_binarizer.pkl")

description_df = pd.read_csv(
    os.path.join(BASE_DIR, "symptom_Description.csv")
)
precaution_df = pd.read_csv(
    os.path.join(BASE_DIR, "symptom_precaution.csv")
)

with open(model_path, 'rb') as f:
    model = pickle.load(f)

with open(encoder_path, 'rb') as f:
    label_encoder = pickle.load(f)

with open(binarizer_path, 'rb') as f:
    binarizer = pickle.load(f)

known_symptoms = set(binarizer.classes_)

description_df["Disease"] = (
    description_df["Disease"]
    .str.lower()
    .str.strip()
)

description_dict = dict(
    zip(
        description_df["Disease"],
        description_df["Description"]
    )
)

precaution_df["Disease"] = (
    precaution_df["Disease"]
    .str.lower()
    .str.strip()
)

precaution_dict = dict(
    zip(
        precaution_df["Disease"],
        precaution_df["Precaution_1"]
    )
)


def normalize_symptom(s):
    return str(s).strip().lower().replace(" ", "_")


def predict_full(user_symptoms):
    if isinstance(user_symptoms, str):
        # allow a comma or space separated string too, just in case
        user_symptoms = [s for s in user_symptoms.replace(",", " ").split() if s]

    normalized = [normalize_symptom(s) for s in user_symptoms]

    # Warn on any symptom the model has never seen — this is the #1 cause
    # of bad predictions, since it silently gets ignored otherwise.
    unrecognized = [s for s in normalized if s not in known_symptoms]
    if unrecognized:
        print(f"[warning] Unrecognized symptoms (ignored): {unrecognized}")

    embedding = binarizer.transform([normalized])

    probabilityOfModel = model.predict_proba(embedding)[0]
    top3indexes = probabilityOfModel.argsort()[-3:][::-1]
    result = {}
    for i in top3indexes:
        disease = label_encoder.inverse_transform([i])[0]
        confidence = float(probabilityOfModel[i] * 100)
        description = description_dict[disease]
        precaution = precaution_dict[disease]
        result["disease"] = disease
        result["confidence"] = confidence
        result["description"] = description
        result["precaution"] = precaution
        break
    return result
