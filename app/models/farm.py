from .db import db


class Farm(db.Model):
    __tablename__ = 'farms'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(50), nullable=False, unique=True)
    type = db.Column(db.String(30), nullable=False)
    job = db.Column(db.String(1000), nullable=False)
    description = db.Column(db.String(1500), nullable=False)
    address = db.Column(db.String(100), nullable=False)
    state = db.Column(db.String(100), nullable=False)
    ownerId = db.Column(db.Integer)
    latitude = db.Column(db.Float)
    longitude = db.Column(db.Float)
    images = db.relationship('Image', backref='farms')
    reservations = db.relationship('Reservation', backref='farms')
    reviews = db.relationship('Review', backref='farms')

    def to_dict(self):
        return {
            "id": self.id,
            "name": self.name,
            "type": self.type,
            "job": self.job,
            "description": self.description,
            "address": self.address,
            "state": self.state,
            "ownerId": self.ownerId,
            "latitude": self.latitude,
            "longitude": self.longitude
        }
