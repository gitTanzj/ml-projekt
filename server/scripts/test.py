from image_eval import load_image
import sys
import json
import tensorflow as tf
import numpy as np
from tensorflow.keras.preprocessing import image
from tensorflow.keras.applications.mobilenet_v2 import MobileNetV2, preprocess_input, decode_predictions

def main():
    model = MobileNetV2(weights='imagenet')
    img_array = load_image('../uploads/_DSC4922.jpg')
    predictions = model.predict(img_array)
    decoded_predictions = decode_predictions(predictions, top=3)[0]

    decoded_predictions = [
        (class_id, class_name, float(score))
        for class_id, class_name, score in decoded_predictions
    ]

    print(json.dumps(decoded_predictions))

if __name__ == "__main__":
    main()