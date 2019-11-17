DROP DATABASE IF EXISTS schatapp;
CREATE DATABASE schatapp;

\c schatapp;


CREATE TABLE users
(
    id SERIAL PRIMARY KEY,
    username VARCHAR UNIQUE NOT NULL,
    password VARCHAR NOT NULL,
    profile_pic VARCHAR
);


INSERT INTO users(username, password, profile_pic) VALUES('testAccount', 'pass@123', 'https://imgix.ranker.com/user_node_img/50060/1001188616/original/bender-turns-into-a-criminal-in-the-first-episode-photo-u1?w=650&q=50&fm=pjpg&fit=crop&crop=faces') 



