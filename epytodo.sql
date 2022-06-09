DROP DATABASE IF EXISTS epytodo;

CREATE DATABASE epytodo;

USE epytodo;

CREATE TABLE IF NOT EXISTS user (
    id INT AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    name VARCHAR(255) NOT NULL,
    firstname VARCHAR(255) NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS todo (
    id INT(255) AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255),
    description VARCHAR(255) NOT NULL,
    due_time DATETIME NOT NULL,
    user_id INT unsigned NOT NULL,
    status VARCHAR(255) NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);