from models.init import db
from models.category import Category
from app import app

categories = [
  {"name": "Music", "description": "Music events"},
  {"name": "Business", "description": "Business and networking events"},
  {"name": "Wellness", "description": "Health and wellness events"},
  {"name": "Entertainment", "description": "Entertainment and fun events"},
  {"name": "Education", "description": "Educational events"}
]

with app.app_context():
  for cat in categories:
    existing = Category.query.filter_by(name=cat["name"]).first()
    if not existing:
      new_cat = Category(name=cat["name"], description=cat["description"])
      db.session.add(new_cat)
  db.session.commit()
  print("Categories seeded successfully!")