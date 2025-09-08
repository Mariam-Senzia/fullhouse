from .init import db 

class Category(db.Model):
  __tablename__ = "categories"

  id = db.Column(db.Integer, primary_key=True)
  name = db.Column(db.String)
  description = db.Column(db.Text)

  all_events = db.relationship('Event', backref="categories")