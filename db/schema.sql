CREATE DATABASE atlas_db;

USE atlas_db;

-- Create a users table with the required fields --
CREATE TABLE users
(
	id int NOT NULL AUTO_INCREMENT,
	username VARCHAR(255) NOT NULL,
	pw VARCHAR(255) NOT NULL,
  categories INT,
  watchlist INT,
  PRIMARY KEY(id)
);