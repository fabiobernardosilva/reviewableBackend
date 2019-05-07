-- --------------------------------------------------------
-- Host:                         127.0.0.1
-- Server version:               10.1.26-MariaDB - mariadb.org binary distribution
-- Server OS:                    Win32
-- HeidiSQL Version:             10.1.0.5464
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;


-- Dumping database structure for r2
CREATE DATABASE IF NOT EXISTS `r2` /*!40100 DEFAULT CHARACTER SET latin1 */;
USE `r2`;

-- Dumping structure for table r2.admin
CREATE TABLE IF NOT EXISTS `admin` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `emailId` varchar(50) NOT NULL,
  `adminFullNname` varchar(30) NOT NULL,
  `username` varchar(15) NOT NULL,
  `password` blob NOT NULL,
  PRIMARY KEY (`id`,`emailId`),
  UNIQUE KEY `emailId` (`emailId`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=latin1;

-- Data exporting was unselected.
-- Dumping structure for procedure r2.completeSchoolRatings
DELIMITER //
CREATE DEFINER=`root`@`localhost` PROCEDURE `completeSchoolRatings`()
BEGIN 
  select s.schoolName AS SchoolName, round(avg(r.staffRating),2) AS StaffRating,round(avg(r.facultyRating),2) AS FacultyRating,
round(avg(r.facilityRating),2)AS FacilityRating,
 (ROUND(((ROUND(AVG(r.staffRating),2))+ROUND(AVG(r.facultyRating),2)+
(ROUND(AVG(r.facilityRating),2)))/3,2)) as OverAll_SchoolRating 


from reviews r inner join schools s where r.schoolId=s.schoolId group BY r.schoolId ORDER BY OverAll_SchoolRating DESC;
end//
DELIMITER ;

-- Dumping structure for procedure r2.countAllSchoolReviews
DELIMITER //
CREATE DEFINER=`root`@`localhost` PROCEDURE `countAllSchoolReviews`()
BEGIN
SELECT s.schoolName, count(ss.schoolId) As TotalReviews_Submitted FROM reviews ss INNER JOIN schools s 
WHERE s.schoolId=ss.schoolId group by ss.schoolId ORDER BY TotalReviews_Submitted desc;
END//
DELIMITER ;

-- Dumping structure for event r2.delemptyrating
DELIMITER //
CREATE DEFINER=`root`@`localhost` EVENT `delemptyrating` ON SCHEDULE EVERY 5 DAY STARTS '2019-03-22 04:27:34' ON COMPLETION PRESERVE ENABLE DO BEGIN
DELETE FROM users WHERE userFirstName=null;
  
END//
DELIMITER ;

-- Dumping structure for procedure r2.get_school_details
DELIMITER //
CREATE DEFINER=`root`@`localhost` PROCEDURE `get_school_details`(IN SID int)
BEGIN
SELECT schoolName,schoolWebsite,schoolAddress,schoolCity,schoolEmail,schoolPhone from schools where schoolId=SID;
end//
DELIMITER ;

-- Dumping structure for procedure r2.insert_reviews
DELIMITER //
CREATE DEFINER=`root`@`localhost` PROCEDURE `insert_reviews`(
	IN `sID` INT,
	IN `facrating` INT,
	IN `facirating` INT,
	IN `staffrating` INT,
	IN `comments` VARCHAR(50)


,
	IN `Recommendation` ENUM('Yes','No'),
	IN `PostReviewAs` ENUM('MyName','Anonymous')


)
BEGIN
insert into reviews
set
facultyRating = facrating,
facilityRating =facirating,
staffRating = staffrating,
comments =comments,
recommendation=Recommendation,
postReviewAs=PostReviewAs,
reviewDateTime=current_timestamp,
schoolId=sID;
END//
DELIMITER ;

-- Dumping structure for procedure r2.insert_schools
DELIMITER //
CREATE DEFINER=`root`@`localhost` PROCEDURE `insert_schools`(
	IN `schoolName` VARCHAR(50),
	IN `schoolWebsite` VARCHAR(50),
	IN `schoolAddress` VARCHAR(500),
	IN `schoolCity` VARCHAR(15),
	IN `schoolEmail` VARCHAR(50),
	IN `contactPersonName` VARCHAR(50),
	IN `schoolPhone` VARCHAR(15),
	IN `schoolUsername` VARCHAR(15),
	IN `schoolPassword` BLOB
    

)
BEGIN
insert into schools
set
schoolName=schoolName,
schoolWebsite=schoolWebsite,
schoolAddress=schoolAddress,
schoolCity=schoolCity,
schoolEmail=schoolEmail,
contactPersonName=contactPersonName,
schoolPhone=schoolPhone,
schoolUsername=schoolUsername,
schoolPassword=schoolPassword;
END//
DELIMITER ;

-- Dumping structure for procedure r2.platformVerified
DELIMITER //
CREATE DEFINER=`root`@`localhost` PROCEDURE `platformVerified`(
	IN `SID` int
)
BEGIN
select count(verificationStatus) AS VerfiedByPlatform from users where schoolId=SID AND verificationStatus="PVerified";
END//
DELIMITER ;

-- Dumping structure for procedure r2.recom
DELIMITER //
CREATE DEFINER=`root`@`localhost` PROCEDURE `recom`(IN SID int)
BEGIN
select count(recommendation) AS TotalRecoomendation from reviews where schoolId=SID AND recommendation="Yes";
end//
DELIMITER ;

-- Dumping structure for table r2.reviews
CREATE TABLE IF NOT EXISTS `reviews` (
  `userId` int(11) NOT NULL AUTO_INCREMENT,
  `schoolId` int(11) NOT NULL,
  `facultyRating` tinyint(1) NOT NULL,
  `facilityRating` tinyint(1) NOT NULL,
  `staffRating` tinyint(1) NOT NULL,
  `comments` tinytext NOT NULL,
  `recommendation` enum('Yes','No') NOT NULL COMMENT '0-no,1-yes',
  `postReviewAs` enum('MyName','Anonymous') NOT NULL COMMENT '0-username,1-ANONYMOUS',
  `reviewDateTime` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`userId`,`schoolId`),
  KEY `const_fk_school` (`schoolId`),
  KEY `const_fk_user` (`userId`),
  CONSTRAINT `FK_reviews_schools` FOREIGN KEY (`schoolId`) REFERENCES `schools` (`schoolId`)
) ENGINE=InnoDB AUTO_INCREMENT=22 DEFAULT CHARSET=latin1 COMMENT='Master table for reviews';

-- Data exporting was unselected.
-- Dumping structure for procedure r2.reviewsBySchool
DELIMITER //
CREATE DEFINER=`root`@`localhost` PROCEDURE `reviewsBySchool`(
	IN `sID` int
)
BEGIN 
  SELECT users.UserFullName,reviews.facultyRating,reviews.facilityRating,reviews.staffRating,reviews.comments,
  reviews.recommendation,reviews.postReviewAs, reviews.reviewDateTime FROM (reviews left JOIN schools ON reviews.schoolId = schools.schoolId) 
    left JOIN users on users.userId = reviews.userId 
    WHERE reviews.schoolId= sID AND users.schoolId=sID;
end//
DELIMITER ;

-- Dumping structure for table r2.schoolrankings
CREATE TABLE IF NOT EXISTS `schoolrankings` (
  `schoolId` int(11) DEFAULT NULL,
  `OverallRating` double DEFAULT NULL,
  KEY `FK_schoolRankings_schools` (`schoolId`),
  CONSTRAINT `FK_schoolRankings_schools` FOREIGN KEY (`schoolId`) REFERENCES `schools` (`schoolId`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- Data exporting was unselected.
-- Dumping structure for procedure r2.schoolRating
DELIMITER //
CREATE DEFINER=`root`@`localhost` PROCEDURE `schoolRating`()
begin
select schoolName As School_Name,  (ROUND(((ROUND(AVG(r.staffRating),2))+ROUND(AVG(r.facultyRating),2)+
(ROUND(AVG(r.facilityRating),2)))/3,2)) as OverAll_SchoolRating 

from schools r inner join reviews s where r.schoolId=s.schoolId group by schoolName order by OverAll_SchoolRating desc;
end//
DELIMITER ;

-- Dumping structure for table r2.schools
CREATE TABLE IF NOT EXISTS `schools` (
  `schoolId` int(11) NOT NULL AUTO_INCREMENT,
  `schoolName` varchar(50) NOT NULL,
  `schoolWebsite` varchar(50) NOT NULL,
  `schoolAddress` varchar(500) NOT NULL,
  `schoolCity` varchar(15) NOT NULL,
  `schoolEmail` varchar(50) NOT NULL,
  `contactPersonName` varchar(50) NOT NULL,
  `schoolPhone` varchar(15) NOT NULL,
  `schoolUsername` varchar(15) NOT NULL,
  `schoolPassword` blob NOT NULL,
  PRIMARY KEY (`schoolId`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=latin1;

-- Data exporting was unselected.
-- Dumping structure for procedure r2.schoolVerified
DELIMITER //
CREATE DEFINER=`root`@`localhost` PROCEDURE `schoolVerified`(
	IN `SID` int
)
BEGIN
select count(verificationStatus) AS VerfiedBySchool from users where schoolId=SID AND verificationStatus="Verified";
END//
DELIMITER ;

-- Dumping structure for procedure r2.total_reviews
DELIMITER //
CREATE DEFINER=`root`@`localhost` PROCEDURE `total_reviews`(IN SID int)
BEGIN
select count(schoolId) AS TotalReviews from reviews where schoolId=SID;
end//
DELIMITER ;

-- Dumping structure for procedure r2.update_users
DELIMITER //
CREATE DEFINER=`root`@`localhost` PROCEDURE `update_users`(
	IN `userFullName` VARCHAR(40),
	IN `userEmail` VARCHAR(40),
	IN `userDOB` DATE,
	IN `userNationality` VARCHAR(15)

    
)
BEGIN


DECLARE uID INT;
DECLARE sID INT;
SET  uID= (SELECT MAX(userId) FROM reviews);
SET sID= (SELECT schoolId FROM reviews WHERE  userId=(SELECT MAX(userId) FROM reviews));
UPDATE users
set
userFullName=userFullName,
userEmail=userEmail,
userDOB=userDOB,
userNationality=userNationality
WHERE userId=uID AND schoolId=sID;
END//
DELIMITER ;

-- Dumping structure for procedure r2.userBySchool
DELIMITER //
CREATE DEFINER=`root`@`localhost` PROCEDURE `userBySchool`(IN sID int)
BEGIN 
  
SELECT userFullname, userEmail , userDOB, userNationality, verificationStatus from users where schoolId=sID;
end//
DELIMITER ;

-- Dumping structure for table r2.users
CREATE TABLE IF NOT EXISTS `users` (
  `userId` int(11) NOT NULL,
  `schoolId` int(11) NOT NULL,
  `UserFullName` varchar(40) DEFAULT NULL,
  `userEmail` varchar(40) DEFAULT NULL,
  `userDOB` date DEFAULT NULL,
  `userNationality` varchar(15) DEFAULT NULL,
  `verificationStatus` enum('Verified','PVerified','NotVerified') NOT NULL DEFAULT 'NotVerified' COMMENT '0-pending,1-verified',
  `postStatus` enum('Posted','NotPosted') NOT NULL DEFAULT 'NotPosted' COMMENT '0-pending,1-verified',
  PRIMARY KEY (`userId`,`schoolId`),
  KEY `FK_users_schools` (`schoolId`),
  CONSTRAINT `FK_users_reviews` FOREIGN KEY (`userId`) REFERENCES `reviews` (`userId`),
  CONSTRAINT `FK_users_schools` FOREIGN KEY (`schoolId`) REFERENCES `schools` (`schoolId`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- Data exporting was unselected.
-- Dumping structure for trigger r2.deleteuser
SET @OLDTMP_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION';
DELIMITER //
CREATE TRIGGER `deleteuser` AFTER DELETE ON `users` FOR EACH ROW BEGIN 
  
delete from reviews where userID=old.userId;

END//
DELIMITER ;
SET SQL_MODE=@OLDTMP_SQL_MODE;

-- Dumping structure for trigger r2.userInsert
SET @OLDTMP_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION';
DELIMITER //
CREATE TRIGGER `userInsert` AFTER INSERT ON `reviews` FOR EACH ROW BEGIN 
  
insert into users (schoolId, userId)   
values(new.schoolId, new.userID);

END//
DELIMITER ;
SET SQL_MODE=@OLDTMP_SQL_MODE;

/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IF(@OLD_FOREIGN_KEY_CHECKS IS NULL, 1, @OLD_FOREIGN_KEY_CHECKS) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
