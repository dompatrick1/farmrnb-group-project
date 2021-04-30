from flask import Blueprint, jsonify, request, redirect
from app.models import Review, db
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
def create_review(id):
    form = NewReviewForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        newReview = Review()
        form.populate_obj(newReview)
        db.session.add(newReview)
        db.session.commit()
        return newReview.to_dict()
    return 'Bad Data'

@review_routes.route('/farm/<int:id>', methods=["PATCH"])
def edit_review(id):
    form = NewReviewForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        review = Review.query.get(id)
        form.populate_obj(review)
        db.session.add(review)
        db.session.commit()
        return review.to_dict()
    return 'Bad Data'

@review_routes.route('/<int:id>', methods=["DELETE"])
def delete_review(id):
    review = Review.query.get(id)
    print(review)
    db.session.delete(review)
    db.session.commit()
    return {}
