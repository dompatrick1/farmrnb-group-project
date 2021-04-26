from .db import db

class Image(db.Model):
    __tablename__ = 'images'

    
    id = db.Column(db.Integer, primary_key=True)
    image = db.Column(db.String)
    farmId = db.Column(db.Integer, db.ForeignKey('farms.id'), nullable = False)
    