CREATE TABLE `resume` (
`id` int(11) NOT NULL AUTO_INCREMENT PRIMARY KEY,
`companyName` varchar(100) NOT NULL DEFAULT '',
`job_title` varchar(100) NOT NULL DEFAULT '',
`job_desc` varchar(800) NOT NULL DEFAULT '',
`company_image` text,
`work_date` varchar(100) NOT NULL DEFAULT ''
);


INSERT INTO `resume` VALUES (1,'bold commerce','Installer','Working shopify themes. app install.','https://media.winnipegfreepress.com/images/1000*666/NEP5246733.jpg','2018-2020');
INSERT INTO `resume` VALUES (2,'IDO media','web editor','web page design.','https://pbs.twimg.com/media/D3Fox7DXcAAPS28.jpg','2017-2018');
INSERT INTO `resume` VALUES (3,'Datang micro semiconductor','hardware design','pcb design','https://lh3.googleusercontent.com/proxy/z_z1yCiVbj_NVTenBhqY80QExdQcRG_K_wiSZaTfzBnovc0uTjrCq0lCRmWW5JNKOaRH6RD-oktlPAm-H1aR2fEbGGLJqOYl5kKlGOHg1cJC8jtq1UdzLc1b21Ysf4MEq31O9JQUKBo3_0kli74','2010-2015');
INSERT INTO `resume` VALUES (4,'Vimicro','hardware design','schematic and pcb design','http://y3.ifengimg.com/2bca98cc4d5f6546/2015/0623/rdn_5588d22ef3c60.jpg','2010-2015');

SELECT * FROM resume;
DROP TABLE resume;
