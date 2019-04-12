CREATE DATABASE atlas_db;
USE atlas_db;

-- Create a users table with the required fields --
CREATE TABLE users
(
	userId int NOT NULL AUTO_INCREMENT,
	username VARCHAR(255) NOT NULL,
	pw VARCHAR(255) NOT NULL,
    PRIMARY KEY(userId)
);

CREATE TABLE watchlists
(
	id int NOT NULL PRIMARY KEY,
	list_name VARCHAR(50) NOT NULL,
	movies JSON,
	userId INT,
);