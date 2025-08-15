from .init import db

class Payment(db.Model):
    __tablename__ = 'payments'

    id = db.Column(db.Integer, primary_key=True)
    booking_id = db.Column(db.Integer, db.ForeignKey('bookings.id'))	
    method = db.Column(db.String)	
    total_price = db.Column(db.String)
    transaction_id	= db.Column(db.Integer)	
    status = db.Column(db.String)		
    ticket_qr = db.Column(db.String)	
    created_at = db.Column(db.Date)
