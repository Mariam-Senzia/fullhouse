from flask import Flask, jsonify, make_response, request
from flask_migrate import Migrate
from models.init import db
from models.user import User
from models.event import Event
from models.booking import Booking
from models.payment import Payment
from models.checkin import Checkin
from flask_restful import Api, Resource
from datetime import datetime
import re


app =  Flask(__name__)

app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///app.db' 
app.config['SQLALCHEMY_TRACK_MODIFICATION'] = False

db.init_app(app)
migrate = Migrate(app, db)
api = Api(app)


class EventResource(Resource):
    def post(self):
        try :
            formData = request.get_json()

            date_str = formData.get("date")
            date_obj = datetime.strptime(
            re.sub(r'(\d{1,2})(st|nd|rd|th)', r'\1', date_str),
            "%d %b %Y"
            ).date()

            start_time_str = formData.get("start_time") 
            start_time_obj = datetime.strptime(start_time_str, "%I:%M %p").time()

            end_time_str = formData.get("end_time")
            end_time_obj = datetime.strptime(end_time_str, "%I:%M %p").time()

            newEvent = Event(
                title = formData.get("title"),
                description = formData.get("description"),
                category = formData.get("category"),
                date = date_obj,
                start_time = start_time_obj,
                end_time = end_time_obj,
                location = formData.get("location"),
                capacity = formData.get("capacity"),
                ticket_price = formData.get("ticket_price"),
                created_at = formData.get("created_at")
            )
            
            db.session.add(newEvent)
            db.session.commit()

            return make_response(jsonify({"message": "Event created successfully"}), 200)

        except Exception as e:
            print(e)
            return make_response(jsonify({"message": "Failed to create event"}), 404)
        
    def get(self):
        try:
            events = Event.query.all()

            return jsonify(
                [{
                    "id": item.id,
                    "organizer_id": item.organizer_id, 
                    "title": item.title, 
                    "description": item.description, 
                    "category": item.category, 
                    "date": item.date.strftime("%d %b %Y") if item.date else None, 
                    "start_time": item.start_time.strftime("%I:%M %p") if item.start_time else None, 
                    "end_time": item.end_time.strftime("%I:%M %p") if item.end_time else None, 
                    "location": item.location, 
                    "capacity": item.capacity, 
                    "ticket_price": str(item.ticket_price), 
                    "created_at": item.created_at.strftime("%d %b %Y %I:%M %p") if item.created_at else None
                    } for item in events]
                )

        except Exception as e:
            print(e)
            return make_response(jsonify({"message": "Failed to get events"}), 404)
        
    def put(self, id):
        try:
            event = db.session.query(Event, id)

            formData = request.get_json()

            date_str = formData.get("date")
            date_obj = datetime.strptime(
            re.sub(r'(\d{1,2})(st|nd|rd|th)', r'\1', date_str),
            "%d %b %Y"
            ).date()

            start_time_str = formData.get("start_time") 
            start_time_obj = datetime.strptime(start_time_str, "%I:%M %p").time()

            end_time_str = formData.get("end_time")
            end_time_obj = datetime.strptime(end_time_str, "%I:%M %p").time()

            event.title = formData.get("title")
            event.description = formData.get("description")
            event.category = formData.get("category")
            event.date = date_obj
            event.start_time = start_time_obj
            event.end_time = end_time_obj
            event.location = formData.get("location")
            event.capacity = formData.get("capacity")
            event.ticket_price = formData.get("ticket_price")
            event.created_at = formData.get("created_at")

            db.session.commit()

            return make_response(jsonify({"message": "Event updated successfully"}), 200)

        except Exception as e:
            print(e)
            return make_response(jsonify({"message": "Error updating event"}), 404)

    def delete(self, id):
        try:
            event = db.session.get(Event, id)

            if event:
                db.session.delete(event)
                db.session.commit()

            return make_response(jsonify({"message": "Event deleted successfully"}), 200)

        except Exception as e:
            print(e)
            return make_response(jsonify({"message": "Error updating event"}), 404)

api.add_resource(EventResource,'/events', '/event/<int:id>')


if __name__ == "__main__":
    app.run(debug=True)