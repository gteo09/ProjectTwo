CREATE DATABASE atlas_db;

USE atlas_db;

-- Create a burgers table with the required fields --
CREATE TABLE users
(
	userId int NOT NULL AUTO_INCREMENT,
	username VARCHAR(255) NOT NULL,
	'password' VARCHAR(255) NOT NULL,
  PRIMARY KEY(userId),
	CONSTRAINT watch_lists FOREIGN KEY (userId)
	REFERENCES users(userId);
);

CREATE TABLE watch_lists
(
	id int NOT NULL PRIMARY KEY,
	list_name VARCHAR(50) NOT NULL,
	movies JSON,
	userId INT FOREIGN KEY REFERENCES users(userId)
);