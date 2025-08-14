from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

class Booking(db.Model):
    __tablename__ = "bookings"

    id = db.Column(db.integer, primary_key=True)
    event_id = db.Column(db.Integer, db.ForeignKey('events.id'))		
    user_id	= db.Column(db.Integer, db.Foreignkey('users.id'))	
    quantity = db.Column(db.Integer)
    total_ticket_price = db.Colmn(db.Numeric(10,2))		
    created_at = db.Column(db.Time)	
    guest_name = db.Column(db.String)		
    guest_email = db.Column(db.Text)	
    guest_phone	= db.Column(db.String)		
