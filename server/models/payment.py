from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

class Payment(db.Model):
    __tablename__ = 'payments'

    id = db.column(db.Integer, primary_key=True)
    booking_id = db.Column(db.Integer, db.ForeignKey('booking.id'))	
    method = db.Column(db.String)	
    total_price = db.Column(db.String)
    transaction_id	= db.Column(db.Integer)	
    status = db.Column(db.String)		
    ticket_qr = db.column(db.String)	
    created_at = db.Column(db.Date)
