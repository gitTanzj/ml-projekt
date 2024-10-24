import sys
import json
import tensorflow as tf
import numpy as np
from tensorflow.keras.preprocessing import image
from tensorflow.keras.applications.mobilenet_v2 import MobileNetV2, preprocess_input, decode_predictions

def load_image(img_path):
    img = image.load_img(img_path, target_size=(224, 224))
    img_array = image.img_to_array(img)
    img_array = np.expand_dims(img_array, axis=0)
    img_array = preprocess_input(img_array)
    return img_array

def main():
    if len(sys.argv) < 2:
        print("Usage: python image_eval.py <image_path>")
        sys.exit(1)

    img_path = sys.argv[1]
    model = MobileNetV2(weights='imagenet')
    img_array = load_image(img_path)
    predictions = model.predict(img_array)
    decoded_predictions = decode_predictions(predictions, top=3)[0]

    decoded_predictions = [
        (class_id, class_name, float(score))
        for class_id, class_name, score in decoded_predictions
    ]

    print(json.dumps(decoded_predictions))

if __name__ == "__main__":
    main()