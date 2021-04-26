from app.models import db, Reservation


def seed_reservations():
    reservationList = [
        Reservation(
            userId=1, farmId=1, startDate='2021-04-26', endDate='2021-05-01'),
        Reservation(
            userId=1, farmId=2, startDate='2021-05-20', endDate='2021-05-24'),
        Reservation(
            userId=1, farmId=3, startDate='2021-05-08', endDate='2021-05-12')
    ]

    db.session.add_all(reservationList)

    db.session.commit()


def undo_reservations():
    db.session.execute('TRUNCATE reservations RESTART IDENTITY CASCADE;')
    db.session.commit()
