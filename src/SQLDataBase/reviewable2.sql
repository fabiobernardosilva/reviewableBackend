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


-- Dumping database structure for reviewable
CREATE DATABASE IF NOT EXISTS `reviewable` /*!40100 DEFAULT CHARACTER SET latin1 */;
USE `reviewable`;

-- Dumping structure for table reviewable.admin
CREATE TABLE IF NOT EXISTS `admin` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(30) NOT NULL,
  `emailId` varchar(50) NOT NULL,
  `ureviewname` varchar(30) NOT NULL,
  `password` varchar(30) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=latin1;

-- Data exporting was unselected.
-- Dumping structure for procedure reviewable.avg_rating_by_schoolId
DELIMITER //
CREATE DEFINER=`root`@`localhost` PROCEDURE `avg_rating_by_schoolId`(IN `schoolid` INT)
BEGIN
select avg(schoolrating) as averageSchoolRating,avg(staffRating) as averageStaffRating,avg(facultyRating) as averageFacultyRating,avg(facilityRating)as averageFacilityRating from reviews where verificationStatus=1 and schoolId=schoolid group by schoolId;
END//
DELIMITER ;

-- Dumping structure for table reviewable.city
CREATE TABLE IF NOT EXISTS `city` (
  `CityID` int(11) NOT NULL AUTO_INCREMENT,
  `CityName` varchar(30) DEFAULT NULL,
  PRIMARY KEY (`CityID`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- Data exporting was unselected.
-- Dumping structure for procedure reviewable.get_all_reviews
DELIMITER //
CREATE DEFINER=`root`@`localhost` PROCEDURE `get_all_reviews`()
BEGIN
SELECT * FROM reviews;
END//
DELIMITER ;

-- Dumping structure for procedure reviewable.get_reviews_by_schoolId
DELIMITER //
CREATE DEFINER=`root`@`localhost` PROCEDURE `get_reviews_by_schoolId`(IN `schoolId` int(11))
BEGIN
 SELECT schools.schoolName,ureviews.ureviewFirstName,ureviews.ureviewLastName,reviews.* 
 FROM reviews inner join schools on schools.schoolId=reviews.schoolId inner join ureviews on reviews.ureviewId=ureviews.ureviewID
 WHERE schoolId = schoolId;
 END//
DELIMITER ;

-- Dumping structure for procedure reviewable.get_reviews_by_schoolname
DELIMITER //
CREATE DEFINER=`root`@`localhost` PROCEDURE `get_reviews_by_schoolname`()
BEGIN
select schools.schoolName,reviews.schoolRating,reviews.facultyRating,reviews.facultyRating,reviews.facilityRating,reviews.staffRating from reviews inner join schools on reviews.schoolId=schools.schoolId order by schools.schoolId;

END//
DELIMITER ;

-- Dumping structure for procedure reviewable.get_verified_reviews
DELIMITER //
CREATE DEFINER=`root`@`localhost` PROCEDURE `get_verified_reviews`()
BEGIN
select * from reviews where verificationStatus=1;
END//
DELIMITER ;

-- Dumping structure for table reviewable.reviews
CREATE TABLE IF NOT EXISTS `reviews` (
  `schoolId` int(11) NOT NULL,
  `ureviewId` int(11) NOT NULL,
  `facultyRating` tinyint(1) DEFAULT NULL,
  `facilityRating` tinyint(1) DEFAULT NULL,
  `staffRating` tinyint(1) DEFAULT NULL,
  `reviewDateTime` datetime DEFAULT NULL,
  `comments` varchar(500) DEFAULT NULL,
  `recommendation` enum('Yes','No') DEFAULT NULL COMMENT '0-Yes,1-No',
  `postReviewAs` enum('RealName','Anonymous') DEFAULT NULL COMMENT '0-ureviewname,1-ANONYMOUS',
  `verificationStatus` enum('Verified','Pending','NotVefified') NOT NULL DEFAULT 'Pending' COMMENT '0-pending,1-verified',
  `postStatus` enum('Posted','NotPosted') NOT NULL DEFAULT 'NotPosted' COMMENT '0-notposted,1-Posted',
  PRIMARY KEY (`schoolId`,`ureviewId`),
  KEY `const_fk_school` (`schoolId`),
  KEY `const_fk_ureview` (`ureviewId`),
  CONSTRAINT `const_fk_school` FOREIGN KEY (`schoolId`) REFERENCES `schools` (`schoolId`),
  CONSTRAINT `const_fk_ureview` FOREIGN KEY (`ureviewId`) REFERENCES `ureviews` (`ureviewID`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COMMENT='Master table for reviews';

-- Data exporting was unselected.
-- Dumping structure for table reviewable.schools
CREATE TABLE IF NOT EXISTS `schools` (
  `schoolId` int(11) NOT NULL AUTO_INCREMENT,
  `schoolName` varchar(100) NOT NULL,
  `schoolAddress` varchar(500) NOT NULL,
  `CityID` int(11) NOT NULL,
  `schoolEmail` varchar(30) NOT NULL,
  `contactPersonName` varchar(30) NOT NULL,
  `schoolPhone` varchar(50) NOT NULL,
  `schoolureviewname` varchar(30) NOT NULL,
  `schoolPassword` varchar(30) NOT NULL,
  PRIMARY KEY (`schoolId`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=latin1;

-- Data exporting was unselected.
-- Dumping structure for table reviewable.ureviews
CREATE TABLE IF NOT EXISTS `ureviews` (
  `ureviewID` int(11) NOT NULL AUTO_INCREMENT,
  `school` int(11) NOT NULL,
  `ureviewFirstName` varchar(30) NOT NULL,
  `ureviewLastName` varchar(30) NOT NULL,
  `ureviewDOB` date NOT NULL,
  `Nationality` varchar(30) NOT NULL,
  PRIMARY KEY (`ureviewID`),
  KEY `FK_ureviews_schools` (`school`),
  CONSTRAINT `FK_ureviews_schools` FOREIGN KEY (`school`) REFERENCES `schools` (`schoolId`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=latin1;

-- Data exporting was unselected.
/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IF(@OLD_FOREIGN_KEY_CHECKS IS NULL, 1, @OLD_FOREIGN_KEY_CHECKS) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
