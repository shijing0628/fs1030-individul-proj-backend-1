CREATE TABLE `resume` (
`id` int(11) NOT NULL AUTO_INCREMENT  PRIMARY KEY,
`language` varchar(100) NOT NULL DEFAULT '',
`address` varchar(100) NOT NULL DEFAULT '',
`info` varchar(800) NOT NULL DEFAULT ''
);


INSERT INTO `resume` VALUES (1,'Janpanese','123 Street Winnipeg, MB','I am a good person.');