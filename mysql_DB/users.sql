-- Save users in database
 CREATE TABLE `users` (
   `id` INT(20) NOT NULL AUTO_INCREMENT PRIMARY KEY,
   `name` VARCHAR(100) NOT NULL DEFAULT '',
   `email` VARCHAR(100) NOT NULL DEFAULT '',
   `password` CHAR(100) NOT NULL 
 );

 INSERT INTO `users` VALUES (1,'joe smith','joe@gmail.com','12345678');
 
 SELECT * FROM users;

 DROP TABLE users;