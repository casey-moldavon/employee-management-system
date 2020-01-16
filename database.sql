DROP DATABASE IF EXISTS employees_db;
CREATE DATABASE employees_db;
USE employees_db;

-- department switched with station
-- these are not typically added to or removed
CREATE TABLE station (
    id INT NOT NULL AUTO_INCREMENT,
    name VARCHAR (50) NOT NULL, -- to hold station name

    PRIMARY KEY (id)
);

-- these are not added to or removed
CREATE TABLE roles (
    id INT NOT NULL AUTO_INCREMENT,
    title VARCHAR (50) NOT NULL,
    salary DECIMAL (10, 4) NULL,
    station_id INT (50) NULL, -- to hold reference to station role belongs to

    PRIMARY KEY (id)
);

-- manager & manager_id switched with commander_id
-- these can be added or removed
CREATE TABLE employee (
    id INT NOT NULL AUTO_INCREMENT,
    first_name VARCHAR(50) NOT NULL, -- to hold employee first name
    last_name VARCHAR(50) NULL, --  to hold employee last name
    role_id INT (50) NULL, -- to hold reference to role employee has
    commander_id INT (50) NULL, -- to hold reference to another employee that commander of the current employee. This field may be null if the employee has no commander

    PRIMARY KEY (id)
);



