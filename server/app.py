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

            title=formData.get("title")
            description=formData.get("description")
            category=formData.get("category")
            date=date_obj
            start_time=start_time_obj
            end_time=end_time_obj
            location=formData.get("location")
            capacity=formData.get("capacity")
            ticket_price=formData.get("ticket_price")
            created_at=formData.get("created_at")

            newEvent = Event(
            title = title,
            description = description,
            category = category,
            date = date,
            start_time = start_time,
            end_time = end_time,
            location = location,
            capacity = capacity,
            ticket_price = ticket_price,
            created_at = created_at
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
                    "date": item.date,
                    "start_time": item.start_time, 
                    "end_time": item.end_time, 
                    "location": item.location, 
                    "capacity": item.capacity, 
                    "ticket_price": str(item.ticket_price), 
                    "created_at": item.created_at
                    } for item in events]
                )

        except Exception as e:
            print(e)
            return make_response(jsonify({"message": "Failed to get events"}), 404)
        
    def put(self, id):
        try:
            event = Event.query.get(id)

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

            title=formData.get("title")
            description=formData.get("description")
            category=formData.get("category")
            date=date_obj
            start_time=start_time_obj
            end_time=end_time_obj
            location=formData.get("location")
            capacity=formData.get("capacity")
            ticket_price=formData.get("ticket_price")
            created_at=formData.get("created_at")

            event.title = title
            event.description = description
            event.category = category
            event.date = date
            event.start_time = start_time
            event.end_time = end_time
            event.location = location
            event.capacity = capacity
            event.ticket_price = ticket_price
            event.created_at = created_at

            db.session.commit()

            return jsonify({"message": "Event updated successfully"})

        except Exception as e:
            print(e)
            return jsonify({"message": "Error updating event"})

api.add_resource(EventResource,'/events', '/event/<int:id>')


if __name__ == "__main__":
    app.run(debug=True)