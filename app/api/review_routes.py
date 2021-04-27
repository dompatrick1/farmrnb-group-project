from flask import Blueprint, jsonify
from app.models import Review
from app.forms import NewReviewForm

review_routes = Blueprint('reviews', __name__)


@review_routes.route('/')  # WORKS
def all_reviews():
    reviews = Review.query.all()
    return {"reviews": [review.to_dict() for review in reviews]}


@review_routes.route('/farm/<int:id>')  # WORKS
def get_review(id):
    reviews = Review.query.filter(Review.farmId == id).all()
    return {"reviews": [review.to_dict() for review in reviews]}


@review_routes.route('/user/<int:id>')  # WORKS
def get_user_reviews(id):
    reviews = Review.query.filter(Review.userId == id).all()
    return {"reviews": [review.to_dict() for review in reviews]}


@review_routes.route('/farm/<int:id>', methods=["POST"])
def create_review(review):
    form = NewReviewForm()
