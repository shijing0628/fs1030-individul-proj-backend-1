 -- This table for store contact us form data. Anyone can write the constact form in contact page. But only people who register and login, this guy can see all the info about contact info list
 
 CREATE TABLE `contact` (
   `id` INT(20) NOT NULL AUTO_INCREMENT PRIMARY KEY,
   `name` VARCHAR(100) NOT NULL DEFAULT '',
   `email` VARCHAR(100) NOT NULL DEFAULT '',
   `phoneNumber` INT(20) NOT NULL, 
   `content` TEXT
 );

 INSERT INTO `contact` VALUES (1,'test name','test@gmail.com',2042222255,'random content for testing one.');
 SELECT * FROM contact;
 DROP TABLE contact;