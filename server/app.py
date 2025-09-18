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
from datetime import datetime, timedelta
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
app.config['JWT_ACCESS_TOKEN_EXPIRES'] = timedelta(days=1) 
app.config['JWT_REFRESH_TOKEN_EXPIRES'] = timedelta(days=1) 

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

    
    @jwt_required()
    def put(self):
        try:
            logged_in_user = int(get_jwt_identity())

            id=logged_in_user

            user = User.query.filter_by(id = id).first()

            if not user:
                return make_response(jsonify({"message": "User not found"}), 404)

            form_data = request.get_json()

            if "name" in form_data:
                user.name = form_data["name"]

            if "phone_number" in form_data:
                user.phone_number = form_data["phone_number"]

            db.session.commit()
                

            return make_response(jsonify({
                "message": "User updated successfully",
                "user": {
                    "id": user.id,
                    "name": user.name,
                    "phone_number": user.phone_number
                    }
                }), 200)
        
        except Exception as e:
            print(e)
            return make_response(jsonify({"message": "Error updating user"}))

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

class CategoryResource(Resource):
    """API resource for handling category-related operations."""

    # def post(self):
    #     """Handle POST requests for creating categories."""

    #     try:
    #         form_data = request.get_json()
    #         name = form_data.get("name")

    #         category = Category.query.filter_by(name = name).first()

    #         if category:
    #             return make_response(jsonify({"message": "Event category already exists"}))

    #         newCatgory = Category(
    #             name = name,
    #             description = form_data.get("description")
    #         )
    #         db.session.add(newCatgory)
    #         db.session.commit()

    #         return make_response(jsonify({
    #             "message": "Category created successfully",
    #             "category": {     
    #                 "name": newCatgory.name,
    #                 "description": newCatgory.description,
    #                 "id": newCatgory.id
    #             }
    #         }), 200)

    #     except Exception as e:
    #         print(e)
    #         return make_response(jsonify({"message": "Error creating category"}))

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

    # def delete(self, id):
    #     category = Category.query.filter_by(id = id).first()

    #     if category:
    #         db.session.delete(category)
    #         db.session.commit()

    #         return make_response(jsonify({"message": "event deleted successfully"}))

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
                    "id": new_event.id,
                    "name": new_event.name,
                    "description": new_event.description,
                    "event_date": new_event.event_date.strftime("%d-%b-%Y"), 
                    "start_time": new_event.start_time.strftime("%H:%M"),     
                    "end_time": new_event.end_time.strftime("%H:%M"),
                    "ticket_price": new_event.ticket_price,
                }
            }), 200)

        except Exception as e:
            print(e)
            return make_response(jsonify({"message": "Failed to create event"}), 404)
        
    @jwt_required()
    def get(self):
        """Handle GET requests for getting an event of a logged in organizer."""

        try:
            user_id = int(get_jwt_identity())

            if not user_id:
                return make_response(jsonify({"message": "No user found"}))

            events = Event.query.filter_by(user_id = user_id).all()

            return make_response(jsonify([
                {
                    "id": event.id,
                    "category_id": event.category_id, 
                    "name": event.name, 
                    "description": event.description, 
                    "event_date": event.event_date.strftime("%d %b %Y") if event.event_date else None,     
                } for event in events
            ]), 200)

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
                return make_response(jsonify({"message": "Event not found or not yours"}), 404)

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

            return make_response(jsonify({
                "message": "Event updated successfully",
                "event": {
                    "id": event.id,
                    "name": event.name,
                    "description": event.description,
                    "event_date": event.event_date.strftime("%d-%b-%Y"), 
                    "start_time": event.start_time.strftime("%H:%M"),     
                    "end_time": event.end_time.strftime("%H:%M"),
                    "ticket_price": event.ticket_price,
                }
                }), 200)

        except Exception as e:
            print(e)
            return make_response(jsonify({"message": "Error updating event"}), 404)

    @jwt_required()
    def delete(self, id):
        """Handle DELETE requests for updating an event."""

        try:
            user_id = int(get_jwt_identity())
            event = Event.query.filter_by(id=id, user_id=user_id).first()

            if not event:
                return make_response(jsonify({"message": "Event not found or not yours"}), 404)

            db.session.delete(event)
            db.session.commit()

            return make_response(jsonify({"message": "Event deleted successfully"}), 200)

        except Exception as e:
            print(e)
            return make_response(jsonify({"message": "Error updating event"}), 404)

api.add_resource(EventResource,'/api/v1/events', '/api/v1/event/<int:id>')

class EventDetailResource(Resource):
    """API resource for handling event detail operations."""

    @jwt_required()
    def get(self, id):
        """Handle POST requests for getting an event detail."""

        try:
            user_id = int(get_jwt_identity())
            event = Event.query.filter_by(id=id, user_id=user_id).first()

            if not event:
                return make_response(jsonify({"message": "Event not found or not yours"}), 404)

            return make_response(jsonify({
                "user_id" : event.user_id,
                "category_id" : event.category_id,
                "name" : event.name,
                "description" : event.description,
                "latitude" : event.latitude,
                "longitude" : event.longitude,
                "event_date" : event.event_date.strftime("%d-%b-%Y"),
                "start_time" : event.start_time.strftime("%H:%M"),
                "end_time" : event.end_time.strftime("%H:%M"),
                "ticket_price" : event.ticket_price
            }))

        except Exception as e:
            print(e)
            return make_response(jsonify({"message": "Errorr getting an event's details"}))

api.add_resource(EventDetailResource, '/api/v1/eventdetail/<int:id>')

class BookingResource(Resource):
    """API resource for handling booking-related operations."""

    def post(self):
        """Handle POST requests for creating a new booking."""
        
        try:
            form_data = request.get_json()

            name = form_data.get("name")
            email = form_data.get("email")
            phone_number = form_data.get("phone number")

            existing_user = User.query.filter_by(email = email).first()

            if existing_user:
                user_id = existing_user.id
            else:
               new_user = User(
                name = name,
                email = email,
                phone_number = phone_number
               ) 
               db.session.add(new_user)
               db.session.commit()

               user_id = new_user.id

            event_id = form_data.get("event_id")
            existing_event = Event.query.filter_by(id = event_id).first()
            
            new_booking = Booking(
                event_id = form_data.get("event_id"),
                user_id = user_id,
                tickets_quantity = form_data.get("tickets_quantity"),
                event_price = existing_event.ticket_price   
            )
            db.session.add(new_booking)
            db.session.commit()

            return make_response(jsonify({
                "message": "Event booked successfully",
                "booking": {
                    "booking_id": new_booking.id,
                    "event_id": new_booking.event_id,
                    "user_id": new_booking.user_id,
                    "tickets_quantity": new_booking.tickets_quantity,
                    "event_price": new_booking.event_price,
                    "created_at": new_booking.created_at,
                    "checked_in": new_booking.checked_in,	
                    "checked_in_Date": new_booking.checked_in_Date
                    }
                }))

        except Exception as e:
            print(e)
            return make_response(jsonify({"message": "Error creating booking"}))

    # @jwt_required()    
    # def get(self, id):
    #     """Handle POST requests for getting bookings."""

    #     try: 
    #         user_id = int(get_jwt_identity())

    #         bookings = Booking.query.filter_by(id = id, user_id = user_id).all()

    #         if not bookings:
    #             return make_response(jsonify({"message": "Booking not found or not yours"}), 404)

    #         return make_response(jsonify([{
    #             "event_id": item.event_id,
    #             "user_id": item.user_id,
    #             "tickets_quantity": item.tickets_quantity,
    #             "event_price": item.event_price,
    #             "created_at": item.created_at,
    #             "checked_in": item.checked_in,	
    #             "checked_in_Date": item.checked_in_Date
    #             } for item in bookings]), 200)
            
    #     except Exception as e:
    #         print(e)
    #         return make_response(jsonify({"message": "Error getting booking"}))

api.add_resource(BookingResource, "/api/v1/bookings", "/api/v1/booking/<int:id>")


# Payment Integration
class IPNResource(Resource):
    """API resource for handling payment webhooks."""

    def post(self):
        try:
            form_data = request.get_json()

            print(form_data)

            OrderTrackingId = form_data.get("OrderTrackingId")
            hello = form_data.get("hello")

            return make_response(jsonify(True), 200)

        except Exception as e:
            print(e)   
            return make_response(jsonify({"message": "Error posting IPN url"}))

api.add_resource(IPNResource, '/api/v1/webhook')




if __name__ == "__main__":
    app.run(debug=True)