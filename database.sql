DROP DATABASE IF EXISTS employee_db;
CREATE DATABASE employees_db;
USE employees_db;


CREATE TABLE department (
    id INT NOT NULL AUTO_INCREMENT,
    name VARCHAR (50) NOT NULL, -- to hold department name

    PRIMARY KEY (id)
);

CREATE TABLE roles (
    id INT NOT NULL AUTO_INCREMENT,
    title VARCHAR (50) NOT NULL,
    salary DECIMAL (10, 4) NULL,
    department_id INT (50) NULL, -- to hold reference to department role belongs to

    PRIMARY KEY (id)
);

CREATE TABLE employee (
    id INT NOT NULL AUTO_INCREMENT,
    first_name VARCHAR(50) NOT NULL, -- to hold employee first name
    last_name VARCHAR(50) NULL, --  to hold employee last name
    role_id INT (50) NULL, -- to hold reference to role employee has
    manager_id INT (50) NULL, -- to hold reference to another employee that manager of the current employee. This field may be null if the employee has no manager

    PRIMARY KEY (id)
);



