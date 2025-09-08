from .init import db
from datetime import datetime

class User(db.Model):
    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String)
    email = db.Column(db.String)
    password = db.Column(db.Text)
    phone_number = db.Column(db.String)	
    created_at = db.Column(db.DateTime, default=datetime.utcnow, nullable=False)	

    all_events = db.relationship('Event', backref='user')
    all_bookings = db.relationship('Booking',backref='user')
    all_roles = db.relationship('Role', backref='user')