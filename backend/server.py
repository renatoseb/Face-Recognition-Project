import api_functions

from flask import Flask
from flask import jsonify
from flask_cors import CORS


app = Flask(__name__)
CORS(app, resources={r"*": {"origins": "*"}})

# Examples for using function query:
# - query_pics = api_functions.search(input_image, K, "sequential")
# - query_pics = api_functions.search(input_image, K, "rtree")


@app.route('top-k-similars/<top_k>', methods=["GET"])
def get_similar_images(top_k):
    response = jsonify({ "status": "success" })
    return response

if __name__ == '__main__':
    app.run(debug=True)
