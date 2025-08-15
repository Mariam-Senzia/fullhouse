from .init import db

class Event(db.Model):
    __tablename__ = "events"

    id = db.Column(db.Integer, primary_key=True)
    organizer_id = db.Column(db.Integer, db.ForeignKey("users.id"))
    title = db.Column(db.String)
    description = db.Column(db.Text)
    category = db.Column(db.String)
    date = db.Column(db.Date)
    start_time = db.Column(db.Time)
    end_time = db.Column(db.Time)
    location = db.Column(db.String)
    capacity = db.Column(db.Integer)
    ticket_price = db.Column(db.Numeric(10,2))
    created_at = db.Column(db.Time)

    all_events = db.relationship('Booking', backref="events")