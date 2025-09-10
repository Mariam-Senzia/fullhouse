from .init import db
from datetime import datetime

class Booking(db.Model):
    __tablename__ = "bookings"

    id = db.Column(db.Integer, primary_key=True)
    event_id = db.Column(db.Integer, db.ForeignKey('events.id'))		
    user_id	= db.Column(db.Integer, db.ForeignKey('users.id'))
    tickets_quantity = db.Column(db.Integer)
    event_price = db.Column(db.Numeric(10,2))

    created_at = db.Column(db.DateTime, default=datetime.utcnow, nullable=False)
    checked_in = db.Column(db.Boolean, default=False )	
    checked_in_Date = db.Column(db.DateTime)