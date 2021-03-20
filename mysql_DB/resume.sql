CREATE TABLE `resume` (
`id` int(11) NOT NULL AUTO_INCREMENT PRIMARY KEY,
`companyName` varchar(100) NOT NULL DEFAULT '',
`job_title` varchar(100) NOT NULL DEFAULT '',
`job_desc` varchar(800) NOT NULL DEFAULT '',
`work_date` varchar(100) NOT NULL DEFAULT ''
);


INSERT INTO `resume` VALUES (1,'bold commerce','Installer','Working shopify themes. app install.','2018-2020');
INSERT INTO `resume` VALUES (2,'IDO media','web editor','web page design.','2017-2018');
INSERT INTO `resume` VALUES (3,'Datang micro semiconductor','hardware design','pcb design','2010-2015');
SELECT * FROM resume;
DROP TABLE resume;