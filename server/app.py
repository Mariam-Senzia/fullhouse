from flask import Flask

app =  Flask(__name__)

app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///app.db' 
app.config['SQLALCHEMY_TRACK_MODIFICATION'] = False



if __name__ == "__main__":
    app.run(debug=True)