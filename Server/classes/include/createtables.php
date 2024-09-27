<?php
    $query= "CREATE TABLE IF NOT EXISTS customer (
    id INT NOT NULL AUTO_INCREMENT,
    email VARCHAR(30) NOT NULL,
    name VARCHAR(30) NOT NULL,
    password VARCHAR(64) NOT NULL,
    start_date DATE NOT NULL,
    address VARCHAR(50) NOT NULL,
    PRIMARY KEY (id)
    )";   
    $this->runQuery($query);

    $query= "CREATE TABLE IF NOT EXISTS admin (
    id INT NOT NULL AUTO_INCREMENT,
    email VARCHAR(30) NOT NULL,
    name VARCHAR(30) NOT NULL,
    password VARCHAR(64) NOT NULL,
    start_date DATE NOT NULL,
    address VARCHAR(50) NOT NULL,
    PRIMARY KEY (id)
    )";   
    $this->runQuery($query);

    $query= "CREATE TABLE IF NOT EXISTS location (
    id INT NOT NULL AUTO_INCREMENT,
    name VARCHAR(30) NOT NULL,
    address VARCHAR(50) NOT NULL,
    longtitude VARCHAR(10) NOT NULL,
    latitude VARCHAR(10) NOT NULL,
    PRIMARY KEY (id)
    )";   
    $this->runQuery($query);

    $query= "CREATE TABLE IF NOT EXISTS parking_space (
    id INT NOT NULL AUTO_INCREMENT,
    name VARCHAR(20) NOT NULL,
    location_id INT NOT NULL,
    vehicle_type INT NOT NULL,
    guidance VARCHAR(256) NOT NULL,
    PRIMARY KEY (id)
    )";   
    $this->runQuery($query);

    $query= "CREATE TABLE IF NOT EXISTS reservation (
    id INT NOT NULL AUTO_INCREMENT,
    customer_id INT NOT NULL,
    book_time DATETIME NOT NULL,
    start_time DATETIME NOT NULL,
    duration INT NOT NULL,
    description VARCHAR(50),
    PRIMARY KEY (id)
    )";   
    $this->runQuery($query);

    $query= "CREATE TABLE IF NOT EXISTS reserved_space (
    reservation_id INT NOT NULL,
    space_id INT NOT NULL,
    UNIQUE KEY unique_combination (reservation_id, space_id)
    )";   
    $this->runQuery($query);

    $query= "CREATE TABLE IF NOT EXISTS transaction (
    id INT NOT NULL AUTO_INCREMENT,
    reservation_id INT NOT NULL,
    pay_time DATETIME NOT NULL,
    ammount FLOAT NOT NULL,
    PRIMARY KEY (id)
    )";   
    $this->runQuery($query);
    
    $query= "CREATE TABLE IF NOT EXISTS vehicle_type (
    id INT NOT NULL AUTO_INCREMENT,
    name VARCHAR(20) NOT NULL,
    price FLOAT NOT NULL,
    PRIMARY KEY (id)
    )";   
    $this->runQuery($query);
?>