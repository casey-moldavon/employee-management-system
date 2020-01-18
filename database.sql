DROP DATABASE IF EXISTS employees_db;
CREATE DATABASE employees_db;
USE employees_db;

-- department switched with station
-- these are not typically added to or removed
CREATE TABLE station (
    id INT NOT NULL AUTO_INCREMENT,
    name VARCHAR (50) NOT NULL, -- to hold station name
    station_id INT (50) NULL, -- to hold deploy id for employees

    PRIMARY KEY (id)
);

INSERT INTO station (name, station_id)
VALUES ("Star Destoryer", 1557), ("Death Star I", 2187);

-- these are not added to or removed
CREATE TABLE post (
    id INT NOT NULL AUTO_INCREMENT,
    title VARCHAR (50) NOT NULL,
    salary VARCHAR (50) NULL,
    rank_level INT (50) NULL, -- to hold reference to station post belongs to

    PRIMARY KEY (id)
);

INSERT INTO post (title, salary, rank_level)
VALUES
("Admiral", "250,000 credits", 002),
("Captain", "100,000 credits", 005),
("Engineer", "32,000 credits", 008),
("Pilot", "40,000 credits", 008),
("Stormtrooper", "42,000 credits", 010),
("Scout-trooper", "45,000 credits", 009);


-- manager & manager_id switched with commander_id
-- first name and last name was merged into full name (for people with more names)
-- these can be added or removed
CREATE TABLE employee (
    id INT NOT NULL AUTO_INCREMENT,
    full_name VARCHAR(50) NOT NULL, -- to hold employee's full name
    post_id VARCHAR (50) NULL, -- to hold reference to post employee has
    commander_id VARCHAR (50) NULL, -- to hold reference to another employee that commander of the current employee. This field may be null if the employee has no commander
    deploy_id INT (50) NULL, -- Station id employee is deployed to

    PRIMARY KEY (id)
);

INSERT INTO employee (full_name, post_id, commander_id, deploy_id)
VALUES
("Loki", "Admiral", "None", 2187),
("Casey", "Captain", "Loki", 2187),
("Teddy", "Captain", "Loki", 1557),
("Yali", "Engineer", "Casey", 2187),
("Andres", "Enginner", "Casey", 2187),
("Chris", "Stormtrooper", "Casey", 2187),
("Alcide", "Scout-trooper", "Teddy", 1557),
("Brian", "Engineer", "Teddy", 1557);

-- Note: assigned station (deploy_id) determined by commanding officer



