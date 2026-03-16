from .init import db
from datetime import datetime


class Trigger(db.Model):
    __tablename__ = "triggers"

    id = db.Column(db.Integer, primary_key=True)
    booking_id = db.Column(
        db.Integer,
        db.ForeignKey("bookings.id", ondelete="CASCADE"),
        nullable=False,
        unique=True,
    )
    notification_id = db.Column(db.String(100), nullable=False)
    order_tracking_id = db.Column(db.String(100), nullable=True)
    redirect_url = db.Column(db.Text, nullable=True)
    status = db.Column(db.String(20), default="pending", nullable=False)

    created_at = db.Column(db.DateTime, default=datetime.utcnow, nullable=False)
