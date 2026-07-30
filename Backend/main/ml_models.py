import numpy as np
import pandas as pd
import pickle
import os

BASE_DIR = os.path.dirname(os.path.abspath(__file__))

model_path = os.path.join(BASE_DIR, "xgboost_model.pkl")
encoder_path = os.path.join(BASE_DIR, "labelEncoder.pkl")
description_df = pd.read_csv(
    os.path.join(BASE_DIR, "symptom_Description.csv")
)
precaution_df = pd.read_csv(
    os.path.join(BASE_DIR, "symptom_precaution.csv")
)
with open(model_path , 'rb') as f:
    model = pickle.load(f)

with open(encoder_path , 'rb') as f:
    label_encoder = pickle.load(f)

from sentence_transformers import SentenceTransformer
embedding_model = SentenceTransformer("sentence-transformers/all-MiniLM-L6-v2")


import re 

def clean_text(text):
    text = text.lower()
    text = re.sub(r"[^\w\s]", " ", text)
    text = re.sub(r"\s+", " ", text).strip()
    return text


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


def predict_full(user_symptoms):
    input_data = user_symptoms
    if isinstance(input_data, list):
        input_data = " ".join(input_data)
    input_data = clean_text(input_data)

    embedding = embedding_model.encode([input_data])

    probabilityOfModel = model.predict_proba(embedding)[0]
    top3indexes = probabilityOfModel.argsort()[-3:][::-1]
    dict = {}
    for i in top3indexes:
        disease = label_encoder.inverse_transform([i])[0]
        confidence = float(probabilityOfModel[i]*100)
        description = description_dict[ disease ]
        precaution = precaution_dict[disease]
        dict["disease"] = disease
        dict["confidence"] = confidence
        dict["description"] = description
        dict["precaution"] = precaution
        break
    return dict












