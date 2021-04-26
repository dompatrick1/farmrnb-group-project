from flask import Blueprint, jsonify
from app.models import Reservation

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
