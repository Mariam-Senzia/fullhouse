from .init import db
from datetime import datetime

class Role(db.Model):
  __tablename__ = "roles"

  id = db.Column(db.Integer, primary_key=True)
  user_id = db.Column(db.Integer, db.ForeignKey("users.id"))
  role = db.Column(db.Enum("organizer", "attendee"))
  created_at = db.Column(db.DateTime, default=datetime.utcnow, nullable=False)	
