CREATE TABLE `portfolio` (
`id` int(11) NOT NULL AUTO_INCREMENT  PRIMARY KEY  ,
`proj_name` varchar(100) NOT NULL DEFAULT '',
`proj_desc` varchar(800) NOT NULL DEFAULT '',
`creator_name` varchar(100) NOT NULL DEFAULT '',
`image` text,
`date_completed` varchar(45) DEFAULT NULL
);


INSERT INTO `portfolio` VALUES (1,'E-Commerce Shopping Cart','NextJs project.Random text here.','Brenda','https://uwaterloo.ca/news/sites/ca.news/files/styles/feature_large/public/covid-watch-banner-no-text.jpg?itok=4U--ox5-','Fri Jun 21 2019');
