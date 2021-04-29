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
            image='/Pagels1.png', farmId=6
        ),
        Image(
            image='/Pagels2.jpg', farmId=6
        ),
        Image(
            image='/Pagels3.jpg', farmId=6
        ),
        Image(
            image='/Newcomer1.jpg', farmId=7
        ),
        Image(
            image='/Newcomer2.jpg', farmId=7
        ),
        Image(
            image='/Newcomer3.jpg', farmId=7
        ),
        Image(
            image='/Neise1.jpg', farmId=8
        ),
        Image(
            image='/Neise2.jpg', farmId=8
        ),
        Image(
            image='/Neise3.jpg', farmId=8
        ),
        Image(
            image='/franklinton1.jpg', farmId=9
        ),
        Image(
            image='/franklinton2.jpg', farmId=9
        ),
        Image(
            image='/franklinton3.jpg', farmId=9
        ),
        Image(
            image='/NoBoundaries1.jpg', farmId=10
        ),
        Image(
            image='/NoBoundaries2.jpg', farmId=10
        ),
        Image(
            image='/NoBoundaries3.jpg', farmId=10
        ),
        Image(
            image='/temple1.png', farmId=11
        ),
        Image(
            image='/temple2.jpg', farmId=11
        ),
        Image(
            image='/temple3.jpg', farmId=11
        ),
        Image(
            image='/GlassHouse1.jpg', farmId=12
        ),
        Image(
            image='/GlassHouse2.jpg', farmId=12
        ),
        Image(
            image='/GlassHouse3.jpg', farmId=12
        ),
    ]

    db.session.add_all(allImages)
    db.session.commit()


def undo_images():
    db.session.execute('TRUNCATE images RESTART IDENTITY CASCADE;')
    db.session.commit()
