CREATE DATABASE  IF NOT EXISTS `app` /*!40100 DEFAULT CHARACTER SET utf8 */;
USE `app`;
-- MySQL dump 10.13  Distrib 5.7.20, for Linux (x86_64)
--
-- Host: 127.0.0.1    Database: app
-- ------------------------------------------------------
-- Server version	5.7.22

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `amenity`
--

DROP TABLE IF EXISTS `amenity`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `amenity` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `type` varchar(45) NOT NULL,
  `amount` decimal(10,0) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `amenity`
--

LOCK TABLES `amenity` WRITE;
/*!40000 ALTER TABLE `amenity` DISABLE KEYS */;
INSERT INTO `amenity` VALUES (1,'TV',100),(2,'Child Seat',100),(3,'Tablet',50);
/*!40000 ALTER TABLE `amenity` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `car`
--

DROP TABLE IF EXISTS `car`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `car` (
  `id` varchar(45) NOT NULL,
  `model_name` varchar(45) NOT NULL,
  `type_id` int(11) NOT NULL,
  `driver_id` int(11) NOT NULL,
  `active` tinyint(4) NOT NULL DEFAULT '1',
  PRIMARY KEY (`id`),
  KEY `fk_car_1_idx` (`driver_id`),
  KEY `fk_car_2_idx` (`type_id`),
  CONSTRAINT `fk_car_1` FOREIGN KEY (`driver_id`) REFERENCES `driver` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_car_2` FOREIGN KEY (`type_id`) REFERENCES `car_type` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `car`
--

LOCK TABLES `car` WRITE;
/*!40000 ALTER TABLE `car` DISABLE KEYS */;
INSERT INTO `car` VALUES ('MH05DP0991','Swift Dzire2',2,2,1),('MH05DP0992','Swift Dzire2',1,2,1),('MH05DP0993','Swift Dzire2',2,1,1),('MH05DP0997','Swift',1,1,1);
/*!40000 ALTER TABLE `car` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `car_to_amenity`
--

DROP TABLE IF EXISTS `car_to_amenity`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `car_to_amenity` (
  `car_id` varchar(45) NOT NULL,
  `amenity_id` int(11) NOT NULL,
  PRIMARY KEY (`car_id`,`amenity_id`),
  KEY `fk_car_to_amenity_2_idx` (`amenity_id`),
  CONSTRAINT `fk_car_to_amenity_1` FOREIGN KEY (`car_id`) REFERENCES `car` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_car_to_amenity_2` FOREIGN KEY (`amenity_id`) REFERENCES `amenity` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `car_to_amenity`
--

LOCK TABLES `car_to_amenity` WRITE;
/*!40000 ALTER TABLE `car_to_amenity` DISABLE KEYS */;
INSERT INTO `car_to_amenity` VALUES ('MH05DP0991',1),('MH05DP0992',1),('MH05DP0993',1),('MH05DP0997',1),('MH05DP0991',2),('MH05DP0992',2),('MH05DP0993',2),('MH05DP0997',2),('MH05DP0991',3),('MH05DP0997',3);
/*!40000 ALTER TABLE `car_to_amenity` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `car_type`
--

DROP TABLE IF EXISTS `car_type`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `car_type` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `type` varchar(45) NOT NULL,
  `amount` decimal(10,0) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `car_type`
--

LOCK TABLES `car_type` WRITE;
/*!40000 ALTER TABLE `car_type` DISABLE KEYS */;
INSERT INTO `car_type` VALUES (1,'Micro',200),(2,'Mini',300),(3,'Prime',400);
/*!40000 ALTER TABLE `car_type` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `driver`
--

DROP TABLE IF EXISTS `driver`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `driver` (
  `id` int(11) NOT NULL,
  `first_name` varchar(45) NOT NULL,
  `last_name` varchar(45) DEFAULT NULL,
  `active` tinyint(4) NOT NULL DEFAULT '1',
  `contact` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `driver`
--

LOCK TABLES `driver` WRITE;
/*!40000 ALTER TABLE `driver` DISABLE KEYS */;
INSERT INTO `driver` VALUES (1,'Akash','Patel',1,'9427430490'),(2,'Akash1','Pate1',1,'8356903924');
/*!40000 ALTER TABLE `driver` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `driver_booking`
--

DROP TABLE IF EXISTS `driver_booking`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `driver_booking` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `driver_id` int(11) NOT NULL,
  `date` date NOT NULL,
  `trip_start` time NOT NULL,
  `trip_end` time NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `index3` (`driver_id`,`date`,`trip_start`,`trip_end`),
  KEY `fk_driver_booking_1_idx` (`driver_id`),
  CONSTRAINT `fk_driver_booking_1` FOREIGN KEY (`driver_id`) REFERENCES `driver` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=21 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `driver_booking`
--

LOCK TABLES `driver_booking` WRITE;
/*!40000 ALTER TABLE `driver_booking` DISABLE KEYS */;
INSERT INTO `driver_booking` VALUES (20,1,'2019-09-17','10:00:00','13:00:00');
/*!40000 ALTER TABLE `driver_booking` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `rate_distance`
--

DROP TABLE IF EXISTS `rate_distance`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `rate_distance` (
  `id` int(11) NOT NULL,
  `start` int(11) NOT NULL,
  `end` int(11) NOT NULL,
  `amount` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `rate_distance`
--

LOCK TABLES `rate_distance` WRITE;
/*!40000 ALTER TABLE `rate_distance` DISABLE KEYS */;
INSERT INTO `rate_distance` VALUES (1,0,10,100),(2,11,25,200),(3,26,50,300),(4,51,100,400),(5,101,200,500);
/*!40000 ALTER TABLE `rate_distance` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `rate_peak_hours`
--

DROP TABLE IF EXISTS `rate_peak_hours`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `rate_peak_hours` (
  `id` int(11) NOT NULL,
  `start` time NOT NULL,
  `end` time NOT NULL,
  `day_id` int(11) NOT NULL,
  `amount` decimal(10,0) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_peak_hours_1_idx` (`day_id`),
  CONSTRAINT `fk_peak_hours_1` FOREIGN KEY (`day_id`) REFERENCES `weekday` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `rate_peak_hours`
--

LOCK TABLES `rate_peak_hours` WRITE;
/*!40000 ALTER TABLE `rate_peak_hours` DISABLE KEYS */;
INSERT INTO `rate_peak_hours` VALUES (1,'06:00:00','06:59:00',1,100),(2,'07:00:00','07:59:00',1,500),(3,'06:00:00','06:59:00',4,100),(4,'07:00:00','07:59:00',4,500),(5,'18:00:00','20:00:00',4,1000);
/*!40000 ALTER TABLE `rate_peak_hours` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `shift`
--

DROP TABLE IF EXISTS `shift`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `shift` (
  `day` int(11) NOT NULL,
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `driver_id` int(11) NOT NULL,
  `start` time NOT NULL,
  `end` time NOT NULL,
  `available` tinyint(4) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_shift_1_idx` (`day`),
  KEY `fk_shift_2_idx` (`driver_id`),
  KEY `index4` (`driver_id`,`day`),
  CONSTRAINT `fk_shift_1` FOREIGN KEY (`day`) REFERENCES `weekday` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_shift_2` FOREIGN KEY (`driver_id`) REFERENCES `driver` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=21 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `shift`
--

LOCK TABLES `shift` WRITE;
/*!40000 ALTER TABLE `shift` DISABLE KEYS */;
INSERT INTO `shift` VALUES (2,9,1,'09:00:00','20:00:00',1),(3,10,1,'09:00:00','20:00:00',1),(4,11,1,'09:00:00','20:00:00',1),(5,12,1,'09:00:00','20:00:00',1),(6,13,1,'09:00:00','20:00:00',1),(7,14,1,'09:00:00','20:00:00',1),(1,15,1,'09:00:00','20:00:00',1),(2,16,2,'13:00:00','20:00:00',1),(3,17,2,'13:00:00','20:00:00',1),(4,18,2,'13:00:00','20:00:00',1),(5,19,2,'13:00:00','20:00:00',1),(6,20,2,'13:00:00','20:00:00',1);
/*!40000 ALTER TABLE `shift` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `trip`
--

DROP TABLE IF EXISTS `trip`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `trip` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `from_location` varchar(300) NOT NULL,
  `to_location` varchar(300) NOT NULL,
  `start_time` time NOT NULL,
  `end_time` time NOT NULL,
  `user_id` varchar(45) NOT NULL,
  `driver_id` int(11) NOT NULL,
  `status_id` int(11) NOT NULL,
  `car_id` varchar(45) NOT NULL,
  `date` date NOT NULL,
  `distance` decimal(10,0) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_trip_1_idx` (`car_id`),
  KEY `fk_trip_2_idx` (`status_id`),
  KEY `fk_trips_1_idx` (`driver_id`),
  CONSTRAINT `fk_trip_1` FOREIGN KEY (`car_id`) REFERENCES `car` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_trip_2` FOREIGN KEY (`status_id`) REFERENCES `trip_status` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_trips_1` FOREIGN KEY (`driver_id`) REFERENCES `driver` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `trip`
--

LOCK TABLES `trip` WRITE;
/*!40000 ALTER TABLE `trip` DISABLE KEYS */;
INSERT INTO `trip` VALUES (15,'Reliance Corporate Park, MIDC Industrial Area, Ghansoli, Navi Mumbai, Maharashtra 400701, India','Nilje Gaon, Maharashtra 421204, India','10:00:00','13:00:00','f7193680-d7e8-11e9-bc91-0500a517b8e3',1,1,'MH05DP0997','2019-09-16',15);
/*!40000 ALTER TABLE `trip` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `trip_payment`
--

DROP TABLE IF EXISTS `trip_payment`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `trip_payment` (
  `trip_id` int(11) NOT NULL,
  `status` varchar(45) NOT NULL,
  `amount` decimal(10,0) NOT NULL,
  `transaction_id` varchar(45) NOT NULL,
  PRIMARY KEY (`trip_id`),
  KEY `fk_payment_1_idx` (`trip_id`),
  CONSTRAINT `fk_payment_1` FOREIGN KEY (`trip_id`) REFERENCES `trip` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `trip_payment`
--

LOCK TABLES `trip_payment` WRITE;
/*!40000 ALTER TABLE `trip_payment` DISABLE KEYS */;
INSERT INTO `trip_payment` VALUES (15,'paid',200,'f71a20e0-d7e8-11e9-bc91-0500a517b8e3');
/*!40000 ALTER TABLE `trip_payment` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `trip_status`
--

DROP TABLE IF EXISTS `trip_status`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `trip_status` (
  `id` int(11) NOT NULL,
  `status` varchar(45) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `trip_status`
--

LOCK TABLES `trip_status` WRITE;
/*!40000 ALTER TABLE `trip_status` DISABLE KEYS */;
INSERT INTO `trip_status` VALUES (1,'booked'),(2,'ongoing'),(3,'completed');
/*!40000 ALTER TABLE `trip_status` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `weekday`
--

DROP TABLE IF EXISTS `weekday`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `weekday` (
  `id` int(11) NOT NULL,
  `day` varchar(45) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `weekday`
--

LOCK TABLES `weekday` WRITE;
/*!40000 ALTER TABLE `weekday` DISABLE KEYS */;
INSERT INTO `weekday` VALUES (1,'Sunday'),(2,'Monday'),(3,'Tuesday'),(4,'Wednesday'),(5,'Thursday'),(6,'Friday'),(7,'Saturday');
/*!40000 ALTER TABLE `weekday` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2019-09-16  0:16:50
