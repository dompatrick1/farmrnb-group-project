from app.models import db, Farm


def seed_farms():
    farm1 = [
        Farm(
            name="Glorie Farm Winery", type="Winery", job="Harvesting grapes and bottling wine",
            description="Glorie Farms provides the highest quality Hudson Valley fruit to markets, csa, and farm stands across the Hudson Valley including Westchester, Rockland, and Fairfield County. We are looking for farm hands to work in the orchard and vineyard",
            address="40 Mountain Road", state="NY"),
        Farm(
            name="Farm 2", type="Fishery", job="you're cultivating fish",
            description="15 acres of fish tanks", address="2 farm blvd", state="NY"),
        Farm(
            name="Farm 3", type="Agriculture", job="you're planting agriculture",
            description="15 acres of lush fields", address="3 farm blvd", state="NY")
    ]

    # for farm in farm1:
    #     seed = farm
    #     db.session.add(seed)
    db.session.add_all(farm1)

    db.session.commit()


def undo_farms():
    db.session.execute('TRUNCATE farms RESTART IDENTITY CASCADE;')
    db.session.commit()
