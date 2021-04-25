from .db import db
from .farm import Farm
from .user import User 

class Reservation(db.Model):
    __tablename__ = "reservations"

    id = db.Column(db.Integer, primary_key=True)
    userId = db.Column(db.Integer, db.ForeignKey('users.id'), nullable = False, unique = True)
    farmId = db.Column(db.Integer, db.ForeignKey('farms.id'), nullable = False, unique = True)
    startDate = db.Column(db.Date, nullable = False, unique = True)
    endDate = db.Column(db.Date, nullable = False, unique = True)
