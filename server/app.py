from flask import Flask, jsonify, make_response, request
from flask_migrate import Migrate
from models.init import db
from models.user import User
from models.event import Event
from models.booking import Booking
from models.role import Role
from models.category import Category
# from models.payment import Payment
from flask_restful import Api, Resource
from datetime import datetime
import re
from flask_bcrypt import Bcrypt
from flask_jwt_extended import JWTManager, create_access_token, create_refresh_token, get_jwt_identity, jwt_required
import os
from dotenv import load_dotenv

load_dotenv()

app =  Flask(__name__)

app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///app.db' 
app.config['SQLALCHEMY_TRACK_MODIFICATION'] = False
app.config['JWT_SECRET_KEY'] = os.getenv("JWT_SECRET_KEY")

db.init_app(app)
migrate = Migrate(app, db)
api = Api(app)
bcrypt = Bcrypt(app)
jwt = JWTManager(app)

class HomeResource(Resource):
    def get(self):
        return make_response(jsonify({"message": "Welcome to Fullhouse API"}))

api.add_resource(HomeResource ,'/api/v1')

class GetmeResource(Resource):
    """API resource for registering user."""

    @jwt_required()
    def get(self):
        current_user_id = int(get_jwt_identity())

        user = User.query.filter_by(id = current_user_id).first()

        if not user:
            return make_response(jsonify({"message": "User not found"}), 404)

        return make_response(jsonify({
            "id": user.id,
            "name": user.name,
            "email": user.email,
            "phone_number": user.phone_number,
        }), 200)

api.add_resource(GetmeResource, '/api/v1/auth/getme')

class RegisterResource(Resource):
    """API resource for registering user."""

    def post(self):
        """Handle POST request for creating a new user."""

        try:
            form_data = request.get_json()

            password = form_data.get("password")
            hashed_password = bcrypt.generate_password_hash(password).decode("utf-8")

            email = form_data.get("email")
            existing_user = User.query.filter_by(email = email).first()

            if existing_user:
                return make_response(jsonify({"message": "User already exists"}))
            
            new_user = User(
                name = form_data.get("name"),
                email = email,
                password = hashed_password,
                phone_number = form_data.get("phone_number")
            )
            db.session.add(new_user)
            db.session.commit()

            new_role = Role(
                user_id = new_user.id
            )
            db.session.add(new_role)
            db.session.commit()

            return make_response(jsonify({
                "message": "User created successfully",
                "user": {
                    "id": new_user.id,
                    "name": new_user.name,
                    "email": new_user.email,
                    "phone_number": new_user.phone_number,
                    "created_at": new_user.created_at
                },
                "role": {
                    "id": new_role.id,
                    "role": new_role.role,
                    "created_at": new_role.created_at
                }
            }), 201)

        except Exception as e:
            print(e)
            return make_response(jsonify({"message": "Error creating user"}))

api.add_resource(RegisterResource, "/api/v1/auth")

class LoginResource(Resource):
    """API resource for logging user."""

    def post(self):
        """Handle POST requests for logging user."""

        try:
            form_data = request.get_json()
            email = form_data.get("email")
            password = form_data.get("password")

            user = User.query.filter_by(email = email).first()

            if user and (bcrypt.check_password_hash(user.password, password)):
                access_token = create_access_token(identity=str(user.id), additional_claims={"email": user.email})
                refresh_token = create_refresh_token(identity=str(user.id), additional_claims={"email": user.email})

                response = make_response(jsonify({
                    'access_token': access_token,
                    'id': user.id,
                    'username': user.name,
                    'refresh_token':refresh_token
                }), 200)

                return response

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

class UserResource(Resource):
    """API resource for handling booking-related operations."""

    def get(self, id=None):
        """Handle GET requests for specific user."""
        try: 
            if id: 
                user = User.query.filter_by(id = id).first()

                if user:
                    return make_response(jsonify({
                        "id": user.id,
                        "name": user.name,
                        "email": user.email,
                        "phone_number": user.phone_number,
                        "role": user.role
                    }))
            
            else: 
                users = User.query.all()

                return make_response(jsonify(
                    [{
                        "name": item.name,
                        "email":item.email,
                        "phone_number":item.phone_number, 
                        "created_at": item.created_at
                        # "role": item.role  
                    } for item in users]
                ))

        except Exception as e:
            print(e)
            return make_response(jsonify({"messsage": "Error getting user"}))

    def put(self, id):
        """Handle GET requests for specific user."""
        try: 
            user = User.query.filter_by(id = id).first()

            form_data = request.get_json()
            user.name = form_data.get("name")
            user.email = form_data.get("email")
            user.password = form_data.get("password")
            user.phone_number = form_data.get("phone_number")
            user.role = form_data.get("role")

            db.session.commit()

            return make_response(jsonify({"message": "User updated successfully"}))
    
        except Exception as e:
            print(e)
            return make_response(jsonify({"message": "Error updating user"}))
        
api.add_resource(UserResource, "/api/v1/users", "/api/v1/users/<int:id>")

class CategoryResource(Resource):
    """API resource for handling category-related operations."""

    def post(self):
        """Handle POST requests for creating categories."""

        try:
            form_data = request.get_json()
            name = form_data.get("name")

            category = Category.query.filter_by(name = name).first()

            if category:
                return make_response(jsonify({"message": "Event category already exists"}))

            newCatgory = Category(
                name = name,
                description = form_data.get("description")
            )
            db.session.add(newCatgory)
            db.session.commit()

            return make_response(jsonify({
                "message": "Category created successfully",
                "category": {     
                    "name": newCatgory.name,
                    "description": newCatgory.description,
                    "id": newCatgory.id
                }
            }), 200)

        except Exception as e:
            print(e)
            return make_response(jsonify({"message": "Error creating category"}))

    def get(self):
        try:
            categories = Category.query.all()

            return make_response(jsonify([{
                "id": item.id,
                "name": item.name,
                "description": item.description
            } for item in categories ]))

        except Exception as e:
            print(e)
            return make_response(jsonify({"message":"Error getting categories"}))

    def delete(self, id):
        category = Category.query.filter_by(id = id).first()

        if category:
            db.session.delete(category)
            db.session.commit()

            return make_response(jsonify({"message": "event deleted successfully"}))

api.add_resource(CategoryResource, '/api/v1/categories', '/api/v1/categories/<int:id>')

class EventResource(Resource):
    """API resource for handling event-related operations."""

    @jwt_required()
    def post(self):
        """Handle POST requests for creating a new event."""

        try :
            form_data = request.get_json()

            date_str = form_data.get("event_date")
            date_obj = datetime.strptime(
            re.sub(r'(\d{1,2})(st|nd|rd|th)', r'\1', date_str),
            "%d %b %Y"
            ).date()

            start_time_str = form_data.get("start_time") 
            start_time_obj = datetime.strptime(start_time_str, "%I:%M %p").time()

            end_time_str = form_data.get("end_time")
            end_time_obj = datetime.strptime(end_time_str, "%I:%M %p").time()

            # token gets user identity;id
            current_user_id = int(get_jwt_identity())  

            new_event = Event(
                user_id = current_user_id,
                category_id = form_data.get("category_id"),
                name = form_data.get("name"),
                description = form_data.get("description"),
                latitude = form_data.get("latitude"),
                longitude = form_data.get("longitude"),
                event_date = date_obj,
                start_time = start_time_obj,
                end_time = end_time_obj,
                ticket_price = form_data.get("ticket_price"),
            )
            
            db.session.add(new_event)
            db.session.commit()

            return make_response(jsonify({
                "message": "Event created successfully",
                "event": {
                    "user_id": new_event.user_id,
                    "category_id": new_event.category_id,
                    "name": new_event.name,
                    "description": new_event.description,
                    "latitude": new_event.latitude,
                    "longitude": new_event.longitude,
                    "event_date": new_event.event_date.strftime("%d-%b-%Y"), 
                    "start_time": new_event.start_time.strftime("%H:%M"),     
                    "end_time": new_event.end_time.strftime("%H:%M"),
                    "ticket_price": new_event.ticket_price,
                }
            }), 200)

        except Exception as e:
            print(e)
            return make_response(jsonify({"message": "Failed to create event"}), 404)
        
    def get(self, id=None):
        """Handle GET requests for getting an event."""

        try:
            if id:
                event = db.session.get(Event, id)

                return make_response(jsonify(
                    {
                        "id": event.id,
                        "user_id": event.user_id, 
                        "category_id": event.category_id, 
                        "name": event.name, 
                        "description": event.description, 
                        "latitude": event.latitude,
                        "longitude": event.longitude,
                        "event_date": event.event_date.strftime("%d %b %Y") if event.date else None, 
                        "start_time": event.start_time.strftime("%I:%M %p") if event.start_time else None, 
                        "end_time": event.end_time.strftime("%I:%M %p") if event.end_time else None, 
                        "ticket_price": str(event.ticket_price), 
                        "created_at": event.created_at.strftime("%d %b %Y %I:%M %p") if event.created_at else None
                    }
                    ), 200)
            else:
                events = Event.query.all()

                return jsonify(
                    [{
                        "id": item.id,
                        "user_id": item.user_id, 
                        "category_id": item.category_id, 
                        "name": item.name, 
                        "description": item.description, 
                        "latitude": item.latitude,
                        "longitude": item.longitude,
                        "event_date": item.event_date.strftime("%d %b %Y") if item.event_date else None, 
                        "start_time": item.start_time.strftime("%I:%M %p") if item.start_time else None, 
                        "end_time": item.end_time.strftime("%I:%M %p") if item.end_time else None, 
                        "ticket_price": str(item.ticket_price), 
                        "created_at": item.created_at.strftime("%d %b %Y %I:%M %p") if item.created_at else None
                        } for item in events]
                    )

        except Exception as e:
            print(e)
            if id:
                make_response(jsonify({"message": "Error getting event"}), 404)
            else:
                make_response(jsonify({"message": "Failed to get events"}), 404)
        
    def put(self, id):
        """Handle PUT requests for updating an event."""

        try:
            event = db.session.query(Event, id)

            form_data = request.get_json()

            date_str = form_data.get("date")
            date_obj = datetime.strptime(
            re.sub(r'(\d{1,2})(st|nd|rd|th)', r'\1', date_str),
            "%d %b %Y"
            ).date()

            start_time_str = form_data.get("start_time") 
            start_time_obj = datetime.strptime(start_time_str, "%I:%M %p").time()

            end_time_str = form_data.get("end_time")
            end_time_obj = datetime.strptime(end_time_str, "%I:%M %p").time()

            event.title = form_data.get("title")
            event.description = form_data.get("description")
            event.category = form_data.get("category")
            event.date = date_obj
            event.start_time = start_time_obj
            event.end_time = end_time_obj
            event.location = form_data.get("location")
            event.capacity = form_data.get("capacity")
            event.ticket_price = form_data.get("ticket_price")
            event.created_at = form_data.get("created_at")

            db.session.commit()

            return make_response(jsonify({"message": "Event updated successfully"}), 200)

        except Exception as e:
            print(e)
            return make_response(jsonify({"message": "Error updating event"}), 404)

    def delete(self, id):
        """Handle DELETE requests for updating an event."""

        try:
            event = db.session.get(Event, id)

            if event:
                db.session.delete(event)
                db.session.commit()

            return make_response(jsonify({"message": "Event deleted successfully"}), 200)

        except Exception as e:
            print(e)
            return make_response(jsonify({"message": "Error updating event"}), 404)

api.add_resource(EventResource,'/api/v1/events', '/api/v1/event/<int:id>')

class BookingResource(Resource):
    """API resource for handling booking-related operations."""

    def post(self):
        """Handle POST requests for creating a new booking."""
        
        try:
            form_data = request.get_json()

            new_booking = Booking(
                event_id = form_data.get("event_id"),
                user_id = form_data.get("user_id"),
                quantity = form_data.get("quantity"),
                total_ticket_price = form_data.get("total_ticket_price"),
                created_at = form_data.get("ticket_price"),
                guest_name = form_data.get("guest_name"),
                guest_email = form_data.get("guest_email"),
                guest_phone = form_data.get("guest_phone")
            )
            db.session.add(new_booking)
            db.session.commit()

            return make_response(jsonify({"message": "Event booked successfully"}))

        except Exception as e:
            print(e)
            return make_response(jsonify({"message": "Error creating booking"}))
        
    def get(self, id):
        """Handle POST requests for getting bookings."""

        try: 
            bookings = Booking.query.filter_by(user_id = id).all()

            if bookings:
                return make_response(jsonify([{
                    "event_id": item.event_id,
                    "user_id": item.user_id,
                    "quantity": item.quantity,
                    "total_ticket_price": item.total_ticket_price,
                    "created_at": item.created_at,
                    "guest_name": item.guest_name,
                    "guest_email": item.guest_email,
                    "guest_phone": item.guest_phone
                } for item in bookings]), 200)
            
        except Exception as e:
            print(e)
            return make_response(jsonify({"message": "Error getting booking"}))

api.add_resource(BookingResource, "/bookings", "/booking/<int:id>")






if __name__ == "__main__":
    app.run(debug=True)