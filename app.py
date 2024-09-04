from flask import Flask
from flask_cors import CORS
import psycopg2.extras
import psycopg2
import os

app = Flask(__name__)
CORS(app)

# Get the PostgreSQL connection details from environment variables
host = os.environ.get("DB_HOST")
port = os.environ.get("DB_PORT")
database = os.environ.get("DB_NAME")
user = os.environ.get("DB_USER")
password = os.environ.get("DB_PWD")

# Establish a connection to the PostgreSQL database
conn = psycopg2.connect(
    host=host,
    port=port,
    database=database,
    user=user,
    password=password,
    # convert the result to a dictionary
    cursor_factory=psycopg2.extras.RealDictCursor
)

# Rest of the code...
cur = conn.cursor()


@app.route('/')
def hello_world():
    return '<h2>Hello, World!</h2>'

@app.route('/students')
def get_students():
    # Execute a query on the "students" table
    cur.execute("SELECT * FROM students")

    # Fetch all the rows returned by the query
    rows = cur.fetchall()

    return rows

# Close the cursor and the connection
cur.close()
conn.close()