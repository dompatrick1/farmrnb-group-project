from app.models import db, Image


def seed_images():
    allImages = [
        Image(
            image='/GlorieWinery1.jpg', farmId=1
        ),
        Image(
            image='/GlorieWinery2.jpg', farmId=1
        ),
        Image(
            image='/GlorieWinery3.jpg', farmId=1
        ),
        Image(
            image='/VarickWinery1.jpg', farmId=2
        ),
        Image(
            image='/VarickWinery2.jpg', farmId=2
        ),
        Image(
            image='/VarickWinery3.jpg', farmId=2
        ),
        Image(
            image='/PortsOfNewYorkWinery1.jpg', farmId=3
        ),
        Image(
            image='/PortsOfNewYorkWinery2.jpg', farmId=3
        ),
        Image(
            image='/PortsOfNewYorkWinery3.jpg', farmId=3
        ),
        Image(
            image='/DevoeFarm1.jpg', farmId=4
        ),
        Image(
            image='/DevoeFarm2.jpg', farmId=4
        ),
        Image(
            image='/DevoeFarm3.jpg', farmId=4
        ),
        Image(
            image='/Brickstead1.jpg', farmId=5
        ),
        Image(
            image='/Brickstead2.jpg', farmId=5
        ),
        Image(
            image='/Brickstead3.jpg', farmId=5
        ),
        Image(
            image='/Pagels1.jpg', farmId=6
        ),
        Image(
            image='/Pagels2.jpg', farmId=6
        ),
        Image(
            image='/Pagels3.jpg', farmId=6
        )
    ]

    db.session.add_all(allImages)
    db.session.commit()


def undo_images():
    db.session.execute('TRUNCATE images RESTART IDENTITY CASCADE;')
    db.session.commit()
