import psycopg2
import os
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
    password=password
)

# Rest of the code...
cur = conn.cursor()

# Execute a query on the "students" table
cur.execute("SELECT * FROM students")

# Fetch all the rows returned by the query
rows = cur.fetchall()

# Print the results
for row in rows:
    print(row)

# Close the cursor and the connection
cur.close()
conn.close()