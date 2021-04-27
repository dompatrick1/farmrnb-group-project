from flask import Blueprint, jsonify
from app.models import Image

image_routes = Blueprint('images', __name__)


@image_routes.route('/')
def all_images():
    images = Image.query.all()
    return {"images": [image.to_dict() for image in images]}


@image_routes.route('/farm/images/<int:id>')
def getFarmImages(id):
    images = Image.query.filter(Image.farmId == id).all()
    return {"images": [image.to_dict() for image in images]}
