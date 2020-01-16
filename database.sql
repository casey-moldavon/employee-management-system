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
CREATE TABLE post (
    id INT NOT NULL AUTO_INCREMENT,
    title VARCHAR (50) NOT NULL,
    salary DECIMAL (10, 4) NULL,
    station_id INT (50) NULL, -- to hold reference to station post belongs to

    PRIMARY KEY (id)
);


-- manager & manager_id switched with commander_id
-- first name and last name was merged into full name (for people with more names)
-- these can be added or removed
CREATE TABLE employee (
    id INT NOT NULL AUTO_INCREMENT,
    full_name VARCHAR(50) NOT NULL, -- to hold employee's full name
    post_id INT (50) NULL, -- to hold reference to post employee has
    commander_id INT (50) NULL, -- to hold reference to another employee that commander of the current employee. This field may be null if the employee has no commander

    PRIMARY KEY (id)
);



