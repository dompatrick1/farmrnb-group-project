from .db import db
from .farm import Farm
from .user import User

class Review(db.Model):
    __tablename__ = 'reviews'

    id = db.Column(db.Integer, primary_key=True)
    review = db.Column(db.String(1500), nullable = False)
    rating = db.Column(db.Integer, nullable = False)
    userId = db.Column(db.Integer, db.ForeignKey('users.id'), nullable = False)
    farmId = db.Column(db.Integer, db.ForeignKey('farms.id'), nullable = False)


    def to_dict(self):
        return {
            "id": self.id,
            "review": self.review,
            "rating": self.rating,
            "userId": self.userId,
            "farmId": self.farmId
        }
