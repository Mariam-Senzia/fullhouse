from .init import db
from datetime import datetime


class Payment(db.Model):
    __tablename__ = "payments"

    id = db.Column(db.Integer, primary_key=True)
    booking_id = db.Column(
        db.Integer, db.ForeignKey("bookings.id", ondelete="CASCADE"), nullable=False
    )
    order_tracking_id = db.Column(db.String(100), nullable=False)
    amount = db.Column(db.Numeric(10, 2), nullable=False)
    currency = db.Column(db.String(3), default="KES", nullable=False)
    payment_method = db.Column(db.String(50), nullable=True)
    payment_account = db.Column(db.String(120), nullable=True)
    confirmation_code = db.Column(db.String(120), nullable=True)
    payment_status_description = db.Column(db.String(20), nullable=True)
    status_code = db.Column(db.Integer, nullable=True)
    callback_url = db.Column(db.Text, nullable=True)
    payment_date = db.Column(db.DateTime, nullable=True)
    created_at = db.Column(db.DateTime, default=datetime.utcnow, nullable=False)
