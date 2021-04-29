from app.models import db, Farm


def seed_farms():
    farm1 = [
        Farm(
            name="Glorie Farm Winery", type="Winery", job="Harvesting grapes and bottling wine.",
            description="Glorie Farms provides the highest quality Hudson Valley fruit to markets, csa, and farm stands across the Hudson Valley including Westchester, Rockland, and Fairfield County. We are looking for farm hands to work in the orchard and vineyard",
            address="40 Mountain Rd, Marlboro, NY 12542", state="New York"),
        Farm(
            name="Varick Winery", type="Winery", job="Harvesting grapes, bottling wine, and working in the shop.",
            description="Varick Winery is located in Romulus, New York along the Northwest side of Cayuga Lake. We are a proud member of the Cayuga Lake Wine Trail, with a close proximity to our neighboring wineries, breweries, cideries, and distilleries along both Cayuga and Seneca Lake.",
            address="5102 NY-89, Romulus, NY 14541", state="New York"),
        Farm(
            name="Ports of New York Winery", type="Winery", job="Harvesting grapes, bottling wine, and working in the shop.",
            description="Located in the city of Ithaca, on the inlet of the south shore of Cayuga Lake, Ports of New York is a small artisanal urban winery where Meleau™ Specialty Wines and Quotidian™ Table Wines are produced. 100% of the grapes - Vinifera and hybrids - are grown in the Finger Lakes AVA",
            address="815 Taber St, Ithaca, NY 14850", state="New York"),
        Farm(
            name="Devoe Family Farm and Tours", type="Dairy Farm", job="Giving tours to guests, general maintenance and cleaning of the facilities.",
            description="1,400 acre farm with 120 milking cows. Providing tours to teach consumers about where the milk comes from. Great for children to experience a real working dairy farm",
            address="Twin Grove Rd, Monroe, WI 53566", state="Wisconsin"),
        Farm(
            name="Brickstead Dairy Farms", type="Dairy Farm", job="Dish washer in the diner, general maintenance and cleaning of the facilities.",
            description="The dairy farm has been in operation since the mid 1800's. The cow population is currently at 700. The milk produced on the Brick farm is sold to Dairy Farmers of America (DFA), a co-op of dairies that is based out of Missouri.",
            address="1734 Wayside Rd, Greenleaf, WI 54126", state="Wisconsin"),
        Farm(
            name="Pagel's Ponderosa Dairy", type="Dairy Farm", job="General maintenance, cleaning, and bottling and packing of our products.",
            description="Our family farm is committed to producing dairy products of the highest quality by practicing humane, low-stress cow handling, maintaining the local landscape integrity through environmental stewardship, and providing a safe and respectful environment for employees. Our passion comes from pride in our family’s legacy, and our hard work honors the sacrifices our ancestors made to achieve the Pagel’s Ponderosa dream!",
            address="N4893 County C, Kewaunee, WI 54216", state="Wisconsin"),
        Farm(
            name="Newcomer Farms", type="Agriculture", job="General maintenance, cleaning, quality assurance, and packaging.",
            description="Sill operating from the original homestead since 1866, Newcomer Farms understands the importance of being a good steward of our land and resources. From large, complex farming operations to small family-owned fields, Newcomer Farms is your partner in maintaining your farmland and ensuring that it remains beautiful and profitable for generations to come.",
            address="2-454 State Route 15, Bryan, OH 43506", state="Ohio"),
        Farm(
            name="Niese Farms", type="Agriculture", job="General maintenance, cleaning, quality assurance, and packaging.",
            description="Niese Farms is a corn and soybean grain farm located in Crestline, Oh. We are a family run business that has been operating for over 70 years.",
            address="7506 Cole Rd, Crestline, OH 44827", state="Ohio"),
        Farm(
            name="Franklinton Farms", type="Agriculture", job="Helping to build a community of farms. Help us distribute the resources to eliminate the barrier to farming.",
            description="Here at Franklinton Farms, we believe in the power of seeds. We envision a neighborhood and food system that respects the land, values all people, and celebrates community.",
            address="867 W Town St, Columbus, OH 43222", state="Ohio"),
        Farm(
            name="No Boundaries Farm", type="Hemp", job="Harvesting, packing, shipping, and general maintenance and cleaning.",
            description="Our farm was established to provide quality product to nourish one's health, strength and spirit with passion and convenience. Our mission is to provide an alternative, natural way of healing without using industrialized pharmaceutical. We're located in the mountains of San Diego County, where all of our product is grown with plenty of love and attention.",
            address="Jamul, CA 91935", state="California"),
        Farm(
            name="Temple Farms", type="Hemp", job="Harvesting, packing, shipping, and general maintenance and cleaning.",
            description="Temple Farms is a family-owned boutique farm located in Central California's Coastal wine region. Four-generations have been growing on our farm since 1974. Nestled beside the Salinas River our unique and sunny terroir is perfect for growing hemp flowers. We have teamed with fabulous formulators to bring our organically-grown CBD beauty products to the world.",
            address="730 Marquita Ave, Templeton, CA 93465", state="California"),
        Farm(
            name="Glass House Farms", type="Hemp", job="Harvesting, packing, shipping, and general maintenance and cleaning.",
            description="Glass House Farms cultivates its cannabis in sparkling clean, eco-friendly greenhouses using innovative environmental controls that; maximize the coastal sun’s benefit, eliminate harsh elements and bugs that tamper with quality, minimize waste, and maximize water retention with state-of-the-art recapture systems. Each flower is trimmed and packaged with exceeding care to deliver a consistently premium craft cannabis product.",
            address="5601 Casitas Pass Rd, Carpinteria, CA 93013", state="California"),
    ]

    # for farm in farm1:
    #     seed = farm
    #     db.session.add(seed)
    db.session.add_all(farm1)

    db.session.commit()


def undo_farms():
    db.session.execute('TRUNCATE farms RESTART IDENTITY CASCADE;')
    db.session.commit()
