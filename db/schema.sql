CREATE DATABASE atlas_db;
USE atlas_db;

-- Create a users table with the required fields --
CREATE TABLE users
(
	userId int NOT NULL AUTO_INCREMENT,
	username VARCHAR(255) NOT NULL,
	pw VARCHAR(255) NOT NULL,
  PRIMARY KEY(userId)
)Engine=INNODB;

CREATE TABLE watchlists
(
	id int NOT NULL PRIMARY KEY,
	list_name VARCHAR(50) NOT NULL,
	movies JSON,
	created_by INT,
	FOREIGN KEY (created_by) REFERENCES users(userId)
		ON UPDATE CASCADE
		ON DELETE CASCADE
)Engine=INNODB;
