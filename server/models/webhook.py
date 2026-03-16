from .init import db
from datetime import datetime


class Webhook(db.Model):
    __tablename__ = "webhooks"

    id = db.Column(db.Integer, primary_key=True)
    order_tracking_id = db.Column(db.String(100), nullable=True)
    merchant_reference = db.Column(db.String(50), nullable=True)
    order_notification_type = db.Column(db.String(20), nullable=True)
    received_at = db.Column(db.DateTime, default=datetime.utcnow, nullable=False)
