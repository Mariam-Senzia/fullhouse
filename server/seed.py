from models.init import db
from models.category import Category
from app import app

categories = [
    {"name": "Music & Concerts", "description": "Live music and concert events"},
    {
        "name": "Business & Networking",
        "description": "Conferences, seminars and networking events",
    },
    {
        "name": "Arts & Culture",
        "description": "Theatre, exhibitions and cultural events",
    },
    {"name": "Sports & Fitness", "description": "Sports, marathons and fitness events"},
    {"name": "Food & Drink", "description": "Tastings, pop-ups and dining experiences"},
    {"name": "Education & Workshops", "description": "Workshops, courses and talks"},
    {"name": "Free Events", "description": "Events that are free to attend"},
]

with app.app_context():
    Category.query.delete()
    db.session.commit()
    print("Categories cleared!")

    for cat in categories:
        new_cat = Category(name=cat["name"], description=cat["description"])
        db.session.add(new_cat)

    db.session.commit()
    print("Categories seeded successfully!")
