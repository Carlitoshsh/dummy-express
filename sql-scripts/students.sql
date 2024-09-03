    CREATE TABLE students (
        id SERIAL PRIMARY KEY,
        name VARCHAR(50),
        age INT,
        email VARCHAR(100)
    );

    CREATE TABLE assignments (
        id SERIAL PRIMARY KEY,
        student_id INT,
        assignment_name VARCHAR(100),
        deadline DATE,
        FOREIGN KEY (student_id) REFERENCES students(id)
    );

    INSERT INTO students (name, age, email)
    VALUES ('John Doe', 20, 'john.doe@example.com');

    INSERT INTO students (name, age, email)
    VALUES ('Jane Smith', 22, 'jane.smith@example.com');

    INSERT INTO assignments (student_id, assignment_name, deadline)
    VALUES (1, 'Homework 1', '2022-09-30');

    INSERT INTO assignments (student_id, assignment_name, deadline)
    VALUES (1, 'Homework 2', '2022-10-15');