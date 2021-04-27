from app.models import db, Image


def seed_images():
    allImages = [
        Image(
            image='./images/GlorieWinery1.jpg', farmId=1
        ),
        Image(
            image='./images/GlorieWinery1.jpg', farmId=1
        ),
        Image(
            image='./images/GlorieWinery1.jpg', farmId=1
        )
    ]

    db.session.add_all(allImages)
    db.session.commit()


def undo_images():
    db.session.execute('TRUNCATE images RESTART IDENTITY CASCADE;')
    db.session.commit()