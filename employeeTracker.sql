-- Drops the employeeTracker_db if it already exists --
DROP DATABASE IF EXISTS employeeTracker_db;

-- Created the DB "emloyeeTracker_db" (only works on local connections)
CREATE DATABASE employeeTracker_db;

-- Use the DB employeeTracker_db for all the rest of the script
USE employeeTracker_db;

-- Create deapartment Table
create TABLE department (
    id INTEGER NOT NULL AUTO_INCREMENT,
    name VARCHAR(50) NOT NULL,
    PRIMARY KEY (id)
);

-- Create role table
CREATE TABLE role (
    id INTEGER NOT NULL AUTO_INCREMENT,
    title VARCHAR(50) NOT NULL,
    salary DECIMAL NOT NULL,
    department_id INTEGER NOT NULL,
    PRIMARY KEY (id),
    FOREIGN KEY (manager_id) REFERENCES employee (id) 
);

-- Create employee table
create TABLE employee (
    id INTEGER NOT NULL AUTO_INCREMENT,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    role_id INTEGER NOT NULL,
    manager_id INTEGEER,
    PRIMARY KEY (id),
    FOREIGN KEY (role_id) REFERENCES role (id) ON DELETE SET NULL;
    FOREIGN KEY (manager_id) REFERENCES employee (id) 
);

-- Selecting certain things from each table and joining the info together
SELECT first_name, last_name FROM employee INTEGER JOIN role on role_id = role.id;
SELECT name, id FROM department INNER JOIN role on department.id = department_id;
SELECT first_name, last_name, title, salary, department_id FROM role INNER JOIN employee on role_id;
SELECT name, title, salary, fist_name, last_name from department
INNER JOIN role on department.id = department_id
INNER JOIN employee on role.id = role_id WHERE WHERE (name=?), [viewbydepartment];


