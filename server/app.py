from flask import Flask, jsonify, make_response, request
from flask_migrate import Migrate
from models.init import db
from models.user import User
from models.event import Event
from models.booking import Booking
from models.role import Role
from models.category import Category
from models.trigger import Trigger
from models.payment import Payment
from models.webhook import Webhook

# from models.payment import Payment
from flask_restful import Api, Resource
from datetime import datetime, timedelta
import re
from flask_bcrypt import Bcrypt
from flask_jwt_extended import (
    JWTManager,
    create_access_token,
    create_refresh_token,
    get_jwt_identity,
    jwt_required,
)
import os
from dotenv import load_dotenv
from flask_cors import CORS
import requests
import sib_api_v3_sdk
import qrcode
import io
import base64
from weasyprint import HTML

import cloudinary
from cloudinary import CloudinaryImage
import cloudinary.uploader
import cloudinary.api

load_dotenv()

app = Flask(__name__)

app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///app.db"
app.config["SQLALCHEMY_TRACK_MODIFICATION"] = False
app.config["JWT_SECRET_KEY"] = os.getenv("JWT_SECRET_KEY")
app.config["JWT_ACCESS_TOKEN_EXPIRES"] = timedelta(hours=1)
app.config["JWT_REFRESH_TOKEN_EXPIRES"] = timedelta(days=30)

db.init_app(app)
migrate = Migrate(app, db)
CORS(app)
api = Api(app)
bcrypt = Bcrypt(app)
jwt = JWTManager(app)


class HomeResource(Resource):
    def get(self):
        return make_response(jsonify({"message": "Welcome to Fullhouse API"}))


api.add_resource(HomeResource, "/api/v1")


class GetmeResource(Resource):
    """API resource for registering user."""

    @jwt_required()
    def get(self):
        current_user_id = int(get_jwt_identity())

        user = User.query.filter_by(id=current_user_id).first()

        if not user:
            return make_response(jsonify({"message": "User not found"}), 404)

        return make_response(
            jsonify(
                {
                    "id": user.id,
                    "name": user.name,
                    "email": user.email,
                    "phone_number": user.phone_number,
                }
            ),
            200,
        )

    @jwt_required()
    def put(self):
        try:
            logged_in_user = int(get_jwt_identity())

            id = logged_in_user

            user = User.query.filter_by(id=id).first()

            if not user:
                return make_response(jsonify({"message": "User not found"}), 404)

            form_data = request.get_json()

            if "name" in form_data:
                user.name = form_data["name"]

            if "phone_number" in form_data:
                user.phone_number = form_data["phone_number"]

            db.session.commit()

            return make_response(
                jsonify(
                    {
                        "message": "User updated successfully",
                        "user": {
                            "id": user.id,
                            "name": user.name,
                            "phone_number": user.phone_number,
                        },
                    }
                ),
                200,
            )

        except Exception as e:
            print(e)
            return make_response(jsonify({"message": "Error updating user"}))


api.add_resource(GetmeResource, "/api/v1/auth/getme")


class RegisterResource(Resource):
    """API resource for registering user."""

    def post(self):
        """Handle POST request for creating a new user."""

        try:
            form_data = request.get_json()

            password = form_data.get("password")
            hashed_password = bcrypt.generate_password_hash(password).decode("utf-8")

            email = form_data.get("email")
            existing_user = User.query.filter_by(email=email).first()

            if existing_user:
                return make_response(jsonify({"message": "User already exists"}), 409)

            role = form_data.get("role")

            new_user = User(
                name=form_data.get("name"),
                email=email,
                password=hashed_password,
                phone_number=form_data.get("phone_number"),
            )
            db.session.add(new_user)
            db.session.commit()

            new_role = Role(user_id=new_user.id, role=role)
            db.session.add(new_role)
            db.session.commit()

            return make_response(
                jsonify(
                    {
                        "message": "User created successfully",
                        "user": {
                            "id": new_user.id,
                            "name": new_user.name,
                            "email": new_user.email,
                            "phone_number": new_user.phone_number,
                            "created_at": new_user.created_at,
                        },
                        "role": {
                            "id": new_role.id,
                            "role": new_role.role,
                            "created_at": new_role.created_at,
                        },
                    }
                ),
                201,
            )

        except Exception as e:
            print(e)
            return make_response(jsonify({"message": "Error creating user"}), 500)


api.add_resource(RegisterResource, "/api/v1/auth")


class LoginResource(Resource):
    """API resource for logging user."""

    def post(self):
        """Handle POST requests for logging user."""

        try:
            form_data = request.get_json()
            email = form_data.get("email")
            password = form_data.get("password")

            user = User.query.filter_by(email=email).first()

            if user and (bcrypt.check_password_hash(user.password, password)):
                access_token = create_access_token(
                    identity=str(user.id), additional_claims={"email": user.email}
                )
                refresh_token = create_refresh_token(
                    identity=str(user.id), additional_claims={"email": user.email}
                )

                response = make_response(
                    jsonify(
                        {
                            "access_token": access_token,
                            "id": user.id,
                            "username": user.name,
                            "refresh_token": refresh_token,
                        }
                    ),
                    200,
                )

                return response
            return make_response(jsonify({"message": "Invalid email or password"}), 401)

        except Exception as e:
            print(e)
            return make_response(jsonify({"message": "Invalid email or password"}))


api.add_resource(LoginResource, "/api/v1/auth/login")


class RefreshToken(Resource):
    """API resource for refreshing tokens."""

    @jwt_required(refresh=True)
    def post(self):
        """Handle POST requests for refreshing tokens."""
        try:
            current_user = get_jwt_identity()
            new_access_token = create_access_token(identity=current_user)

            return make_response(jsonify({"access_token": new_access_token}))

        except Exception as e:
            print(e)
            return make_response(jsonify({"message": "Error generating tokens"}))


api.add_resource(RefreshToken, "/api/v1/auth/refresh")


class CategoryResource(Resource):
    """API resource for handling category-related operations."""

    def get(self):
        try:
            categories = Category.query.all()

            return make_response(
                jsonify(
                    [
                        {
                            "id": item.id,
                            "name": item.name,
                            "description": item.description,
                        }
                        for item in categories
                    ]
                )
            )

        except Exception as e:
            print(e)
            return make_response(jsonify({"message": "Error getting categories"}))

    # def delete(self, id):
    #     category = Category.query.filter_by(id = id).first()

    #     if category:
    #         db.session.delete(category)
    #         db.session.commit()

    #         return make_response(jsonify({"message": "event deleted successfully"}))


api.add_resource(CategoryResource, "/api/v1/categories", "/api/v1/categories/<int:id>")


class PublicEventsResource(Resource):
    def get(self):
        try:
            page = request.args.get("page", 1, type=int)
            limit = request.args.get("limit", 8, type=int)

            paginated = Event.query.paginate(page=page, per_page=limit, error_out=False)

            # events = Event.query.all()
            response = []

            for e in paginated.items:
                category = Category.query.get(e.category_id) if e.category_id else None

                response.append(
                    {
                        "id": e.id,
                        "title": e.title,
                        "description": e.description,
                        "location": e.location,
                        "price": float(e.ticket_price),
                        "price": "{:,.0f}".format(e.ticket_price),
                        "full_date": e.event_date.isoformat(),
                        "date": e.event_date.strftime("%b %d"),
                        "day": e.event_date.strftime("%a"),
                        "time": f"{e.start_time.strftime('%I:%M %p')} - {e.end_time.strftime('%I:%M %p')}",
                        "category": {
                            "id": category.id,
                            "name": category.name,
                        },
                        "image_url": e.image_url,
                    }
                )

            return make_response(
                jsonify(
                    {
                        "events": response,
                        "total": paginated.total,
                        "pages": paginated.pages,
                        "current_page": paginated.page,
                        "has_next": paginated.has_next,
                    }
                ),
                200,
            )

        except Exception as e:
            print(e)
            return make_response(
                jsonify({"message": "Error fetching public events"}), 500
            )


api.add_resource(PublicEventsResource, "/api/v1/publicEvents")


class EventResource(Resource):
    """API resource for handling event-related operations."""

    # @jwt_required()
    def post(self):
        """Handle POST requests for creating a new event."""

        try:
            form_data = request.form

            image_file = request.files.get("image")

            date_obj = datetime.strptime(form_data.get("event_date"), "%Y-%m-%d").date()

            start_time_obj = datetime.strptime(
                form_data.get("start_time"), "%I:%M %p"
            ).time()

            end_time_obj = datetime.strptime(
                form_data.get("end_time"), "%I:%M %p"
            ).time()

            image_url = None
            if image_file:
                upload_result = cloudinary.uploader.upload(
                    image_file, folder="events", resource_type="image"
                )
                image_url = upload_result.get("secure_url")

            existing_event = Event.query.filter_by(title=form_data.get("title")).first()
            if existing_event:
                return make_response(jsonify({"message": "Event already exists"}), 400)

            new_event = Event(
                title=form_data.get("title"),
                description=form_data.get("description"),
                location=form_data.get("location"),
                event_date=date_obj,
                start_time=start_time_obj,
                end_time=end_time_obj,
                ticket_price=form_data.get("ticket_price"),
                category_id=form_data.get("category_id"),
                image_url=image_url,
            )

            db.session.add(new_event)
            db.session.commit()

            return make_response(
                jsonify(
                    {
                        "message": "Event created successfully",
                        "event": {
                            "id": new_event.id,
                            "title": new_event.title,
                            "description": new_event.description,
                            "location": new_event.location,
                            "price": "{:,.0f}".format(new_event.ticket_price),
                            "date": new_event.event_date.strftime("%b %d"),
                            "day": new_event.event_date.strftime("%a"),
                            "time": f"{new_event.start_time.strftime('%I:%M %p')} - {new_event.end_time.strftime('%I:%M %p')}",
                            "category_id": new_event.category_id,
                            "image_url": new_event.image_url,
                        },
                    }
                ),
                201,
            )

        except Exception as e:
            print(e)
            return make_response(jsonify({"message": "Failed to create event"}), 400)

    @jwt_required()
    def get(self):
        """Handle GET requests for getting an event of a logged in organizer."""

        try:
            user_id = int(get_jwt_identity())

            if not user_id:
                return make_response(jsonify({"message": "No user found"}))

            events = Event.query.filter_by(user_id=user_id).all()

            return make_response(
                jsonify(
                    [
                        {
                            "id": event.id,
                            "category_id": event.category_id,
                            "name": event.name,
                            "description": event.description,
                            "event_date": (
                                event.event_date.strftime("%d %b %Y")
                                if event.event_date
                                else None
                            ),
                        }
                        for event in events
                    ]
                ),
                200,
            )

        except Exception as e:
            print(e)
            make_response(jsonify({"message": "Error getting event"}), 404)

    @jwt_required()
    def put(self, id):
        """Handle PUT requests for updating an event of a logged in organizer."""

        try:
            user_id = int(get_jwt_identity())
            event = Event.query.filter_by(id=id, user_id=user_id).first()

            if not event:
                return make_response(
                    jsonify({"message": "Event not found or not yours"}), 404
                )

            form_data = request.get_json()

            date_str = form_data.get("event_date")
            date_obj = datetime.strptime(
                re.sub(r"(\d{1,2})(st|nd|rd|th)", r"\1", date_str), "%d %b %Y"
            ).date()

            start_time_str = form_data.get("start_time")
            start_time_obj = datetime.strptime(start_time_str, "%I:%M %p").time()

            end_time_str = form_data.get("end_time")
            end_time_obj = datetime.strptime(end_time_str, "%I:%M %p").time()

            event.name = form_data.get("name")
            event.description = form_data.get("description")
            event.category_id = form_data.get("category_id")
            event.event_date = date_obj
            event.start_time = start_time_obj
            event.end_time = end_time_obj
            event.latitude = form_data.get("latitude")
            event.longitude = form_data.get("longitude")
            event.ticket_price = form_data.get("ticket_price")

            db.session.commit()

            return make_response(
                jsonify(
                    {
                        "message": "Event updated successfully",
                        "event": {
                            "id": event.id,
                            "name": event.name,
                            "description": event.description,
                            "event_date": event.event_date.strftime("%d-%b-%Y"),
                            "start_time": event.start_time.strftime("%H:%M"),
                            "end_time": event.end_time.strftime("%H:%M"),
                            "ticket_price": event.ticket_price,
                        },
                    }
                ),
                200,
            )

        except Exception as e:
            print(e)
            return make_response(jsonify({"message": "Error updating event"}), 404)

    # @jwt_required()
    def delete(self, id):
        """Handle DELETE requests for deleting an event."""

        try:
            # user_id = int(get_jwt_identity())
            # event = Event.query.filter_by(id=id, user_id=user_id).first()

            event = Event.query.filter_by(id=id).first()

            if not event:
                return make_response(jsonify({"message": "Event not found"}), 404)

            db.session.delete(event)
            db.session.commit()

            return make_response(
                jsonify({"message": "Event deleted successfully"}), 200
            )

        except Exception as e:
            print(e)
            return make_response(jsonify({"message": "Error updating event"}), 404)


api.add_resource(EventResource, "/api/v1/events", "/api/v1/event/<int:id>")


class EventDetailResource(Resource):
    """API resource for handling event detail operations."""

    # @jwt_required()
    def get(self, id):
        """Handle POST requests for getting an event detail."""

        try:
            # user_id = int(get_jwt_identity())
            # event = Event.query.filter_by(id=id, user_id=user_id).first()

            event = Event.query.filter_by(id=id).first()

            if not event:
                return make_response(
                    jsonify({"message": "Event not found or not yours"}), 404
                )

            return make_response(
                jsonify(
                    {
                        "id": event.id,
                        "title": event.title,
                        "description": event.description,
                        "location": event.location,
                        "price": "{:,.0f}".format(event.ticket_price),
                        "full_date": event.event_date.isoformat(),
                        "date": event.event_date.strftime("%b %d"),
                        "day": event.event_date.strftime("%a"),
                        "time": f"{event.start_time.strftime('%I:%M %p')} - {event.end_time.strftime('%I:%M %p')}",
                        "category_id": event.category_id,
                        "image_url": event.image_url,
                    }
                )
            )

        except Exception as e:
            print(e)
            return make_response(
                jsonify({"message": "Errorr getting an event's details"})
            )


api.add_resource(EventDetailResource, "/api/v1/eventdetail/<int:id>")


class BookingResource(Resource):
    """API resource for handling booking-related operations."""

    def post(self):
        """Handle POST requests for creating a new booking."""

        try:
            form_data = request.get_json()

            event_id = form_data.get("event_id")

            existing_event = Event.query.filter_by(id=event_id).first()
            if not existing_event:
                return make_response(jsonify({"message": "Event not found"}), 404)

            new_booking = Booking(
                full_name=form_data.get("full_name"),
                email=form_data.get("email"),
                phone_number=form_data.get("phone_number"),
                event_id=event_id,
                total_amount=form_data.get("total_amount"),
            )
            db.session.add(new_booking)
            db.session.commit()

            token = get_access_token()
            if not token:
                return make_response(jsonify({"message": "Error getting token"}), 500)

            ipn_id = os.getenv("IPN_ID")
            # ipn_id = register_ipn(token)
            # if not ipn_id:
            #     return make_response(jsonify({"message": "Error registering ipn"}), 500)

            order = submit_order(token, new_booking, ipn_id)
            if not order:
                return make_response(
                    jsonify({"message": "Error submitting order"}), 500
                )

            trigger = Trigger(
                booking_id=new_booking.id,
                notification_id=os.getenv("IPN_ID"),
                order_tracking_id=order.get("order_tracking_id"),
                redirect_url=order.get("redirect_url"),
                status="submitted",
            )
            db.session.add(trigger)
            db.session.commit()

            return make_response(
                jsonify(
                    {
                        "message": "Event booked successfully",
                        "booking": {
                            "booking_id": new_booking.id,
                            "event_id": new_booking.event_id,
                            "full_name": new_booking.full_name,
                            "email": new_booking.email,
                            "total_amount": str(new_booking.total_amount),
                            "status": new_booking.status,
                            "created_at": new_booking.created_at.isoformat(),
                        },
                        # "token": token,
                        "ipn_id": ipn_id,
                        "redirect_url": order.get("redirect_url"),
                        "order_tracking_id": order.get("order_tracking_id"),
                        "merchant_reference": order.get("merchant_reference"),
                    }
                ),
                201,
            )

        except Exception as e:
            print(e)
            db.session.rollback()
            return make_response(jsonify({"message": "Error creating booking"}), 500)

    def get(self, id):
        try:
            booking = Booking.query.filter_by(id=id).first()

            if not booking:
                return make_response(jsonify({"message": "Booking not found"}), 404)

            event = Event.query.filter_by(id=booking.event_id).first()

            return make_response(
                jsonify(
                    {
                        "booking_id": booking.id,
                        "full_name": booking.full_name,
                        "status": booking.status,
                        "event": {
                            "title": event.title,
                            "event_date": event.event_date.strftime("%B %d %Y"),
                            "location": event.location,
                        },
                    }
                ),
                200,
            )
        except Exception as e:
            print(e)
            return make_response(jsonify({"message": "Error getting booking"}), 500)


api.add_resource(BookingResource, "/api/v1/bookings", "/api/v1/booking/<int:id>")


def get_access_token():
    url = "https://pay.pesapal.com/v3/api/Auth/RequestToken"
    CONSUMER_KEY = os.getenv("CONSUMER_KEY")
    CONSUMER_SECRET = os.getenv("CONSUMER_SECRET")

    try:
        response = requests.post(
            url,
            json={"consumer_key": CONSUMER_KEY, "consumer_secret": CONSUMER_SECRET},
            headers={"Content-Type": "application/json", "Accept": "application/json"},
        )

        data = response.json()
        if response.status_code == 200:
            return data.get("token")
        return None

    except Exception as e:
        print(e)
        return None


def register_ipn(token):
    try:
        url = "https://pay.pesapal.com/v3/api/URLSetup/RegisterIPN"
        response = requests.post(
            url,
            json={
                "url": "https://b881-102-209-76-51.ngrok-free.app/api/v1/webhooks",
                "ipn_notification_type": "POST",
            },
            headers={
                "Content-Type": "application/json",
                "Accept": "application/json",
                "Authorization": f"Bearer {token}",
            },
        )

        data = response.json()
        if response.status_code == 200:
            return data.get("ipn_id")
        return None

    except Exception as e:
        print(e)
        return None


def submit_order(token, new_booking, ipn_id):
    try:
        event = Event.query.filter_by(id=new_booking.event_id).first()
        url = "https://pay.pesapal.com/v3/api/Transactions/SubmitOrderRequest"

        response = requests.post(
            url,
            json={
                "id": f"{new_booking.id}_{int(datetime.utcnow().timestamp())}",
                "currency": "KES",
                "amount": float(new_booking.total_amount),
                "description": event.title if event else "Event ticket booking",
                "callback_url": "http://localhost:5173/?payment=success",
                # "notification_id": ipn_id,
                "notification_id": os.getenv("IPN_ID"),
                "billing_address": {
                    "email_address": new_booking.email,
                    "phone_number": new_booking.phone_number,
                    "first_name": new_booking.full_name,
                },
            },
            headers={
                "Content-Type": "application/json",
                "Accept": "application/json",
                "Authorization": f"Bearer {token}",
            },
        )

        data = response.json()
        if response.status_code == 200:
            return data
        return None

    except Exception as e:
        print(e)
        return None


class WebhookResource(Resource):
    """API resource for handling payment webhooks."""

    def post(self):
        try:
            data = request.get_json()

            order_tracking_id = data.get("OrderTrackingId")
            merchant_reference = data.get("OrderMerchantReference")
            order_notification_type = data.get("OrderNotificationType")

            webhook = Webhook(
                order_tracking_id=order_tracking_id,
                merchant_reference=merchant_reference,
                order_notification_type=order_notification_type,
            )
            db.session.add(webhook)
            db.session.commit()

            token = get_access_token()
            if token:
                transaction = get_transaction_status(order_tracking_id, token)

                booking_id = merchant_reference.split("_")[0]
                booking = Booking.query.filter_by(id=int(booking_id)).first()

                payment_date_str = transaction.get("created_date")
                payment_date = (
                    datetime.strptime(payment_date_str, "%Y-%m-%dT%H:%M:%S.%f")
                    if payment_date_str
                    else None
                )

                if booking:
                    payment = Payment(
                        booking_id=booking.id,
                        order_tracking_id=transaction.get("order_tracking_id"),
                        amount=transaction.get("amount"),
                        currency=transaction.get("currency"),
                        payment_method=transaction.get("payment_method"),
                        payment_account=transaction.get("payment_account"),
                        confirmation_code=transaction.get("confirmation_code"),
                        payment_status_description=transaction.get(
                            "payment_status_description"
                        ),
                        status_code=transaction.get("status_code"),
                        callback_url=transaction.get("call_back_url"),
                        payment_date=payment_date,
                    )
                    db.session.add(payment)

                    if transaction.get("status_code") == 1:
                        booking.status = "confirmed"

                    db.session.commit()

                    event = Event.query.filter_by(id=booking.event_id).first()
                    send_booking_confirmation_email(booking, event)

            return make_response(
                jsonify(
                    {
                        "orderNotificationType": order_notification_type,
                        "orderTrackingId": order_tracking_id,
                        "orderMerchantReference": merchant_reference,
                    }
                ),
                200,
            )

        except Exception as e:
            print(e)
            db.session.rollback()
            return make_response(jsonify({"status": 500}), 500)


api.add_resource(WebhookResource, "/api/v1/webhooks")


def get_transaction_status(order_tracking_id, token):
    try:
        response = requests.get(
            f"https://pay.pesapal.com/v3/api/Transactions/GetTransactionStatus?orderTrackingId={order_tracking_id}",
            headers={
                "Content-Type": "application/json",
                "Accept": "application/json",
                "Authorization": f"Bearer {token}",
            },
        )

        data = response.json()
        if response.status_code == 200:
            return data
        return None

    except Exception as e:
        print(e)
        return None


def send_booking_confirmation_email(booking, event):
    try:
        configuration = sib_api_v3_sdk.Configuration()
        configuration.api_key["api-key"] = os.getenv("BREVO_API_KEY")

        api_instance = sib_api_v3_sdk.TransactionalEmailsApi(
            sib_api_v3_sdk.ApiClient(configuration)
        )

        qr_base64, qr_cloudinary = generate_qr_code(booking.id)

        event_date_formatted = event.event_date.strftime("%B %d %Y")
        start_time_formatted = event.start_time.strftime("%I:%M %p")
        end_time_formatted = event.end_time.strftime("%I:%M %p")

        pdf = generate_pdf_ticket(booking, event, qr_base64)
        pdf_base_64 = base64.b64encode(pdf).decode("utf-8") if pdf else None

        send_smtp_email = sib_api_v3_sdk.SendSmtpEmail(
            to=[{"email": booking.email, "name": booking.full_name}],
            sender={"email": "mariamsenzia@gmail.com", "name": "Fullhouse"},
            subject=f"Booking Confirmed - {event.title}",
            attachment=[{"content": pdf_base_64, "name": f"ticket_{booking.id}.pdf"}],
            html_content=f"""
            <!DOCTYPE html>
            <html>
            <body style="margin:0; padding:0; background-color:#f4f4f4; font-family: Arial, sans-serif;">
                <table width="100%" cellpadding="0" cellspacing="0">
                    <tr>
                    <td align="center" style="padding: 40px 16px;">
                        <table width="100%" cellpadding="0" cellspacing="0" style="max-width:420px;">

                        <tr>
                            <td style="background:#ffffff; border-radius:16px; overflow:hidden; box-shadow:0 4px 24px rgba(0,0,0,0.10); border-top:4px solid #cc4324;">
                            <table width="100%" cellpadding="0" cellspacing="0">

                                <tr>
                                <td style="padding:20px 28px 0;">
                                    <p style="margin:0; color:#cc4324; font-size:11px; letter-spacing:4px; text-transform:uppercase; font-weight:700;">FULLHOUSE</p>
                                </td>
                                </tr>

                                <tr>
                                <td style="padding:16px 28px 8px;">
                                    <p style="margin:0 0 4px; color:#999; font-size:10px; letter-spacing:2px; text-transform:uppercase;">Event</p>
                                    <p style="margin:0; color:#111; font-size:20px; font-weight:700; line-height:1.3;">{event.title}</p>
                                </td>
                                </tr>

                                <tr>
                                <td style="padding:16px 28px;">
                                    <table width="100%" cellpadding="0" cellspacing="0">
                                    <tr>
                                        <td width="50%" style="padding-bottom:20px;">
                                        <p style="margin:0 0 4px; color:#999; font-size:10px; letter-spacing:1px; text-transform:uppercase;">Date</p>
                                        <p style="margin:0; color:#111; font-size:13px; font-weight:600;">{event_date_formatted}</p>
                                        </td>
                                        <td width="50%" style="padding-bottom:20px;">
                                        <p style="margin:0 0 4px; color:#999; font-size:10px; letter-spacing:1px; text-transform:uppercase;">Time</p>
                                        <p style="margin:0; color:#111; font-size:13px; font-weight:600;">{start_time_formatted} - {end_time_formatted}</p>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td width="50%">
                                        <p style="margin:0 0 4px; color:#999; font-size:10px; letter-spacing:1px; text-transform:uppercase;">Venue</p>
                                        <p style="margin:0; color:#111; font-size:13px; font-weight:600;">{event.location}</p>
                                        </td>
                                        <td width="50%">
                                        <p style="margin:0 0 4px; color:#999; font-size:10px; letter-spacing:1px; text-transform:uppercase;">Amount Paid</p>
                                        <p style="margin:0; color:#cc4324; font-size:13px; font-weight:700;">KES {booking.total_amount}</p>
                                        </td>
                                    </tr>
                                    </table>
                                </td>
                                </tr>

                                <tr>
                                <td style="padding:0 28px 24px;">
                                    <div style="background:#f9f9f9; border-radius:8px; padding:12px 16px;">
                                    <p style="margin:0 0 2px; color:#999; font-size:10px; letter-spacing:1px; text-transform:uppercase;">Ticket Holder</p>
                                    <p style="margin:0; color:#111; font-size:14px; font-weight:700;">{booking.full_name}</p>
                                    </div>
                                </td>
                                </tr>

                                <tr>
                                <td style="padding:0;">
                                    <table width="100%" cellpadding="0" cellspacing="0">
                                    <tr>
                                        <td width="20" style="background:#f4f4f4; border-radius:0 20px 20px 0; height:20px;"></td>
                                        <td style="border-top:2px dashed #ddd;"></td>
                                        <td width="20" style="background:#f4f4f4; border-radius:20px 0 0 20px; height:20px;"></td>
                                    </tr>
                                    </table>
                                </td>
                                </tr>

                                <tr>
                                <td align="center" style="padding:28px 28px 32px;">
                                    <p style="margin:0 0 20px; color:#999; font-size:10px; letter-spacing:2px; text-transform:uppercase;">Scan at Entrance</p>
                                    <img src="{qr_cloudinary}" width="180" height="180" alt="QR Code" style="display:block; margin:0 auto;"/>
                                </td>
                                </tr>

                            </table>
                            </td>
                        </tr>

                        <tr>
                            <td align="center" style="padding-top:20px;">
                            <p style="margin:0; color:#999; font-size:11px;">See you there!</p>
                            </td>
                        </tr>

                        </table>
                    </td>
                    </tr>
                </table>
            </body>
            </html>
            """,
        )

        api_instance.send_transac_email(send_smtp_email)
        print("Email sent successfully")

    except Exception as e:
        print(f"Error sending email: {e}")


def generate_qr_code(booking_id):
    qr = qrcode.QRCode(
        version=1,
        error_correction=qrcode.constants.ERROR_CORRECT_L,
        box_size=10,
        border=4,
    )
    qr.add_data(f"{os.getenv('FRONTEND_URL')}/checkin/{booking_id}")
    qr.make(fit=True)

    img = qr.make_image(fill_color="black", back_color="white")
    buffer = io.BytesIO()
    img.save(buffer, format="PNG")
    buffer.seek(0)

    qr_base64 = base64.b64encode(buffer.getvalue()).decode("utf-8")
    buffer.seek(0)

    upload_result = cloudinary.uploader.upload(
        buffer,
        folder="qrcodes",
        public_id=f"booking_{booking_id}",
        resource_type="image",
    )

    cloudinary_url = upload_result.get("secure_url")
    return qr_base64, cloudinary_url


def generate_pdf_ticket(booking, event, qr_base64):
    event_date_formatted = event.event_date.strftime("%B %d %Y")
    start_time_formatted = event.start_time.strftime("%I:%M %p")
    end_time_formatted = event.end_time.strftime("%I:%M %p")

    pdf_html = f"""
    <!DOCTYPE html>
    <html>
    <head>
        <style>
            body {{ margin: 0; padding: 40px; background: #ffffff; font-family: Arial, sans-serif; }}
            .ticket {{ border-top: 5px solid #cc4324; padding: 24px; max-width: 500px; margin: 0 auto; }}
            .brand {{ color: #cc4324; font-size: 11px; letter-spacing: 4px; text-transform: uppercase; font-weight: 700; margin-bottom: 20px; }}
            .label {{ color: #999; font-size: 10px; letter-spacing: 1px; text-transform: uppercase; margin: 0 0 4px; }}
            .value {{ color: #111; font-size: 13px; font-weight: 600; margin: 0 0 16px; }}
            .grid {{ display: grid; grid-template-columns: 1fr 1fr; gap: 16px; margin: 20px 0; }}
            .holder {{ background: #f9f9f9; padding: 12px 16px; margin: 16px 0; }}
            .divider {{ border-top: 2px dashed #ddd; margin: 24px 0; }}
            .qr-section {{ text-align: center; padding: 20px 0; }}
            .scan-label {{ color: #999; font-size: 10px; letter-spacing: 2px; text-transform: uppercase; margin-bottom: 16px; }}
            .amount {{ color: #cc4324; font-weight: 700; }}
            .footer {{ text-align: center; color: #999; font-size: 11px; margin-top: 20px; }}
        </style>
    </head>
    <body>
        <div class="ticket">
            <p class="brand">Fullhouse</p>
            <p class="label">Event</p>
            <h2 style="margin:0 0 20px; color:#111; font-size:22px;">{event.title}</h2>
            <div class="grid">
                <div>
                    <p class="label">Date</p>
                    <p class="value">{event_date_formatted}</p>
                </div>
                <div>
                    <p class="label">Time</p>
                    <p class="value">{start_time_formatted} - {end_time_formatted}</p>
                </div>
                <div>
                    <p class="label">Venue</p>
                    <p class="value">{event.location}</p>
                </div>
                <div>
                    <p class="label">Amount Paid</p>
                    <p class="value amount">KES {booking.total_amount}</p>
                </div>
            </div>
            <div class="holder">
                <p class="label">Ticket Holder</p>
                <p style="margin:0; color:#111; font-size:14px; font-weight:700;">{booking.full_name}</p>
            </div>
            <div class="divider"></div>
            <div class="qr-section">
                <p class="scan-label">Scan at Entrance</p>
                <img src="data:image/png;base64,{qr_base64}" width="180" height="180" alt="QR Code"/>
            </div>
            <p class="footer">See you there!</p>
        </div>
    </body>
    </html>
    """
    return HTML(string=pdf_html).write_pdf()


if __name__ == "__main__":
    app.run(debug=True)
