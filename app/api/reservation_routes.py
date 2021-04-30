from flask import Blueprint, jsonify, request
from app.models import Reservation, db
from app.forms import NewReservationForm

reservation_routes = Blueprint('reservations', __name__)

@reservation_routes.route('/')
def all_reservations():
    reservations = Reservation.query.all()
    return {"reservations": [reservation.to_dict() for reservation in reservations]}


@reservation_routes.route('/farm/<int:id>')
def get_farm_reservation(id):
    reservations = Reservation.query.filter(Reservation.farmId == id).all()
    return {"reservations": [reservation.to_dict() for reservation in reservations]}


@reservation_routes.route('/user/<int:id>')
def get_user_reservation(id):
    reservations = Reservation.query.filter(Reservation.userId == id).all()
    return {"reservations": [reservation.to_dict() for reservation in reservations]}


@reservation_routes.route('/farm/<int:id>', methods=["POST"])
def create_reservation(id):
    form = NewReservationForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        newReservation = Reservation()
        form.populate_obj(newReservation)
        db.session.add(newReservation)
        db.session.commit()
        return newReservation.to_dict()
    return 'Bad Data'

@reservation_routes.route('/<int:id>', methods=["DELETE"])
def delete_reservation(id):
    reservation = Reservation.query.get(id)
    db.session.delete(reservation)
    db.session.commit()
    return {}
