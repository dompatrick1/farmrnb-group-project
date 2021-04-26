from app.models import db, Review

def seed_reviews():
    reviewList = [
        Review(review = "Wow! what an amazing experience!!!", rating=4, userId=1, farmId=1),
        Review(review = "Wow! what horrible experience!!!", rating=4, userId=1, farmId=2),
        Review(review = "Would def go again", rating=4, userId=1, farmId=3)
    ]

    db.session.add_all(reviewList)
    db.session.commit()

def undo_reviews():
    db.session.execute('TRUNCATE reviews RESTART IDENTITY CASCADE;')
    db.session.commit()
