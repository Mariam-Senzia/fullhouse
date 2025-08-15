from .init import db

class Booking(db.Model):
    __tablename__ = "bookings"

    id = db.Column(db.Integer, primary_key=True)
    event_id = db.Column(db.Integer, db.ForeignKey('events.id'))		
    user_id	= db.Column(db.Integer, db.ForeignKey('users.id'))	
    quantity = db.Column(db.Integer)
    total_ticket_price = db.Column(db.Numeric(10,2))		
    created_at = db.Column(db.Time)	
    guest_name = db.Column(db.String)		
    guest_email = db.Column(db.Text)	
    guest_phone	= db.Column(db.String)	

    all_bookings = db.relationship('Payment', backref='bookings')	
    all_checkings = db.relationship('Checkin', backref='bookings')
