from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

class Checkin(db.Model):
    __tablename__ = 'checkins'

    id = db.Column(db.Integer, primary_key=True)
    booking_id = db.Column(db.Integer, db.ForeignKey('bookings.id'))
    check_in_date = db.Column(db.Date)
    check_in_time = db.Column(db.Time)