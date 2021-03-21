CREATE TABLE `portfolio` (
`id` int(11) NOT NULL AUTO_INCREMENT  PRIMARY KEY  ,
`proj_name` varchar(100) NOT NULL DEFAULT '',
`proj_desc` varchar(800) NOT NULL DEFAULT '',
`creator_name` varchar(100) NOT NULL DEFAULT '',
`image` text,
`date_completed` varchar(45) DEFAULT NULL
);


INSERT INTO `portfolio` VALUES (1,'E-Commerce Shopping Cart','NextJs project.Random text here.','Brenda','https://uwaterloo.ca/news/sites/ca.news/files/styles/feature_large/public/covid-watch-banner-no-text.jpg?itok=4U--ox5-','Fri Jun 21 2019');



INSERT INTO `portfolio` VALUES (1,'E-Commerce Shopping Cart','NextJs project.Random text here.','Brenda','https://uicookies.com/wp-content/uploads/2019/11/minimal-shopify-themes-1024x807.jpg','Fri Jun 21 2019');

INSERT INTO `portfolio` VALUES (2,'Cookie Store','Javascript project.Random text here.','Lili','https://www.cookingclassy.com/wp-content/uploads/2012/11/sugar+cookieseditededited.jpg','Fri Jun 21 2019');

INSERT INTO `portfolio` VALUES (3,'Covid Tracker','React project.Random text here.','Brenda','https://www.aithority.com/wp-content/uploads/2020/03/covid-19-tracker_Bing-Team.png','Fri Jun 21 2019');

INSERT INTO `portfolio` VALUES (4,'Spotify app clone','React project.Random text here.','Brenda','https://lh3.googleusercontent.com/proxy/H8GytTS-s7ZnDWTapb9fluOBL0M2JMinAeL96g5_vUv3n9fCIMkMNzzta6SRzxFeiFEM6TfXIY_Zn4K9QRNKH8e3BUvs_8oC0a5wbfGsr8e-JkhRNuJfd2KuIIM8','Fri Jun 21 2019');

SELECT * FROM portfolio;
SELECT * FROM portfolio WHERE id=4;


DROP TABLE portfolio;