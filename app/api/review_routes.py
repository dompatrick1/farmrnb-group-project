from flask import Blueprint, jsonify
from app.models import Review

review_routes = Blueprint('reviews', __name__)


@review_routes.route('/')
def all_reviews():
    reviews = Review.query.all()
    return {"reviews": [review.to_dict() for review in reviews]}


@review_routes.route('/farm/<int:id>')
def get_review(id):
    reviews = Review.query.filter(Review.farmId == id).all()
    return {"reviews": [review.to_dict() for review in reviews]}


@review_routes.route('/user/<int:id>')
def get_user_reviews(id):
    reviews = Review.query.filter(Review.userId == id).all()
    return {"reviews": [review.to_dict() for review in reviews]}
