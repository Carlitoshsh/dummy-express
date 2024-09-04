from flask import Flask
from flask_cors import CORS
import psycopg2.extras
import psycopg2
import os
from flask import request

app = Flask(__name__)
CORS(app)

# Get the PostgreSQL connection details from environment variables
host = os.environ.get("DB_HOST")
port = os.environ.get("DB_PORT")
database = os.environ.get("DB_NAME")
user = os.environ.get("DB_USER")
password = os.environ.get("DB_PWD")

@app.route('/')
def hello_world():
    return '<h2>Hello, World!</h2>'

@app.route('/students')
def get_students():
    # Establish a connection to the PostgreSQL database
    rows = connect("SELECT * FROM students")
    # Close the cursor and the connection

    return rows

@app.route('/student', methods=['POST'])
def create_student():
    # Get the data from the request body
    data = request.get_json()

    # Extract the student details from the data
    student_id = data.get('id')
    name = data.get('name')
    age = data.get('age')
    email = data.get('email')

    # Perform any necessary validation on the data
    if check_if_student_exists(student_id):
        return 'Student already exists', 400

    # Establish a connection to the PostgreSQL database
    connect(
        "INSERT INTO students (id, name, age, email) VALUES (%s, %s, %s, %s)",
        (student_id, name, age, email),
        'update'
    )
    return 'Student created successfully', 201

def check_if_student_exists(student_id):
    # Establish a connection to the PostgreSQL database
    rows = connect(
        "SELECT * FROM students WHERE id = %s",
        (student_id,)
    )
    return len(rows) > 0

def connect(sql, data=None, type='select'):
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
    # Execute a query on the "students" table
    cur.execute(sql, data)

    # Fetch all the rows returned by the query
    if type == 'select':
        rows = cur.fetchall()
    else:
        rows = None
    conn.commit()
    cur.close()
    conn.close()
    return rows

