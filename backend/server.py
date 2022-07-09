import api_functions

from flask import Flask, request, Response
from flask import jsonify
from flask_cors import CORS
from werkzeug.utils import secure_filename
import os
import api_functions


app = Flask(__name__)
app.config['UPLOAD_FOLDER'] = os.path.join(os.getcwd(), 'images', 'query')
CORS(app, resources={r"*": {"origins": "*"}})
api_functions.load_encodings()
# Examples for using function query:
# - query_pics = api_functions.search(input_image, K, "sequential")
# - query_pics = api_functions.search(input_image, K, "rtree")

def make_response(query):
    res = []
    for image_path in query[1]:
        name = image_path.split("/")[-1][:-4].split("_")
        real_name = name[0] + " " + name[1]
        res.append({"img": os.path.join(os.getcwd(), image_path), "name": real_name})
    return res

@app.route('/top-k-similars/<top_k>', methods=["POST"])
def get_similar_images(top_k):
    file = request.files['file']
    PATH_FILE = os.path.join(app.config['UPLOAD_FOLDER'], secure_filename(file.filename))
    file.save(PATH_FILE)

    query_results = api_functions.search(PATH_FILE, int(top_k), "sequential")
    response = jsonify({ "images_paths": make_response(query_results), "time": query_results[2] })
    return response

if __name__ == '__main__':
    app.run(debug=True)
