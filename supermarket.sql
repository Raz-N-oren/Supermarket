-- MySQL dump 10.13  Distrib 8.0.28, for macos11 (x86_64)
--
-- Host: localhost    Database: supermarket
-- ------------------------------------------------------
-- Server version	8.0.28

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `cart_items`
--

DROP TABLE IF EXISTS `cart_items`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `cart_items` (
  `id` int NOT NULL AUTO_INCREMENT,
  `product_id` int NOT NULL,
  `quantity` int NOT NULL,
  `cart_id` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `product_id` (`product_id`),
  KEY `cart_id` (`cart_id`),
  CONSTRAINT `cart_items_ibfk_1` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`),
  CONSTRAINT `cart_items_ibfk_2` FOREIGN KEY (`cart_id`) REFERENCES `carts` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=286 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cart_items`
--

LOCK TABLES `cart_items` WRITE;
/*!40000 ALTER TABLE `cart_items` DISABLE KEYS */;
INSERT INTO `cart_items` VALUES (1,35,1,1),(2,39,1,2),(3,36,1,3),(4,37,1,4),(5,35,3,5),(7,42,3,5),(8,58,1,5),(14,65,2,6),(15,64,2,6),(16,202,3,7),(17,181,2,7),(18,146,2,7),(19,39,1,7),(20,154,1,7),(21,202,1,8),(22,215,1,9),(23,35,1,9),(24,216,2,9),(25,215,3,10),(26,35,2,10),(28,181,2,10),(29,202,2,10),(34,119,2,11),(35,181,2,11),(36,146,4,11),(37,216,2,11),(38,39,2,11),(39,137,2,11),(40,220,2,11),(41,202,1,12),(42,181,3,13),(43,202,1,14),(44,181,1,14),(52,202,1,17),(53,202,1,18),(54,202,1,19),(55,146,1,19),(56,202,1,20),(57,146,2,20),(58,146,2,21),(59,202,2,22),(60,202,2,23),(61,181,2,24),(62,146,1,24),(63,202,1,24),(64,215,1,24),(72,146,1,25),(73,216,1,25),(74,92,1,25),(75,35,1,25),(76,198,1,25),(77,132,1,25),(78,202,1,26),(79,181,1,26),(80,146,2,26),(81,35,1,26),(82,119,1,26),(83,137,1,26),(84,202,1,27),(85,181,1,27),(86,146,1,27),(87,35,1,27),(88,137,1,27),(89,119,1,27),(90,202,1,28),(91,181,1,28),(92,146,1,28),(93,216,1,28),(94,137,1,28),(95,119,1,28),(96,202,1,29),(97,146,1,29),(98,181,1,29),(99,216,1,29),(100,39,3,29),(101,137,3,29),(102,119,4,29),(103,154,4,29),(104,132,3,29),(105,74,3,29),(106,202,2,30),(107,146,2,30),(108,181,2,30),(109,35,2,30),(110,39,2,30),(111,137,1,30),(112,119,2,30),(113,198,3,30),(114,202,2,31),(115,146,2,31),(117,35,2,31),(118,137,2,31),(119,119,2,31),(120,154,2,31),(121,202,1,32),(122,181,4,32),(123,146,5,32),(124,154,2,32),(125,137,1,32),(126,152,1,32),(127,74,3,33),(128,202,1,33),(129,181,2,33),(130,146,3,33),(131,74,3,34),(132,91,1,34),(133,188,2,34),(134,87,2,34),(135,88,1,34),(136,87,2,35),(137,5,1,35),(138,6,1,35),(139,85,1,35),(140,212,1,35),(152,181,1,36),(153,146,1,36),(154,215,1,36),(155,39,1,36),(156,136,1,36),(157,137,1,36),(158,154,1,36),(159,202,19,37),(160,181,1,37),(161,146,4,37),(162,74,3,37),(163,202,2,41),(164,146,1,41),(165,39,1,41),(166,202,1,42),(167,39,4,42),(168,216,2,42),(169,136,5,42),(170,202,1,43),(171,202,1,44),(184,53,4,46),(185,215,1,46),(186,216,1,46),(187,181,1,46),(188,202,2,47),(189,202,2,48),(191,226,3,48),(192,226,1,49),(196,202,1,45),(197,226,1,51),(198,4,1,52),(199,181,1,52),(200,202,1,53),(201,181,1,54),(202,202,1,55),(206,87,1,56),(208,202,1,58),(209,202,1,59),(210,202,2,57),(220,202,1,61),(221,146,1,61),(222,202,1,62),(223,146,1,62),(224,216,1,62),(225,39,1,62),(226,202,1,63),(227,146,1,64),(232,202,20,66),(233,92,6,66),(234,154,6,66),(235,202,1,67),(236,216,1,67),(241,202,2,68),(242,202,4,69),(244,83,2,69),(245,210,3,69),(246,35,2,69),(257,4,3,60),(258,202,1,71),(260,146,5,71),(261,35,5,71),(262,3,1,71),(263,137,1,71),(264,119,1,71),(265,175,1,71),(266,92,1,71),(281,181,4,73),(282,39,3,73),(283,181,4,74),(284,202,1,72),(285,35,1,72);
/*!40000 ALTER TABLE `cart_items` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `carts`
--

DROP TABLE IF EXISTS `carts`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `carts` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `creation_date` datetime NOT NULL,
  `is_open` tinyint NOT NULL,
  PRIMARY KEY (`id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `carts_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=75 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `carts`
--

LOCK TABLES `carts` WRITE;
/*!40000 ALTER TABLE `carts` DISABLE KEYS */;
INSERT INTO `carts` VALUES (1,5930918,'2022-07-05 13:05:06',0),(2,5930918,'2022-07-05 13:06:21',0),(3,5930918,'2022-07-05 13:06:41',0),(4,5930918,'2022-07-05 13:06:56',0),(5,5930918,'2022-07-05 13:07:17',0),(6,5930918,'2022-07-05 13:57:55',0),(7,5930918,'2022-07-06 16:56:11',0),(8,5930918,'2022-07-07 14:06:01',0),(9,5930918,'2022-07-07 17:01:25',0),(10,5930918,'2022-07-13 16:24:38',0),(11,5930918,'2022-07-13 17:06:09',0),(12,5930918,'2022-07-15 14:31:23',0),(13,5930918,'2022-07-15 14:32:17',0),(14,5930918,'2022-07-18 13:02:49',0),(15,5930918,'2022-07-18 13:09:17',0),(17,5930918,'2022-07-19 12:16:50',0),(18,5930918,'2022-07-19 16:44:46',0),(19,5930918,'2022-07-19 16:45:10',0),(20,5930918,'2022-07-19 16:58:12',0),(21,5930918,'2022-07-19 17:02:22',0),(22,5930918,'2022-07-19 17:12:53',0),(23,5930918,'2022-07-19 17:13:11',0),(24,5930918,'2022-07-19 17:38:21',0),(25,5930918,'2022-07-19 18:45:57',0),(26,5930918,'2022-07-20 12:11:18',0),(27,5930918,'2022-07-20 12:14:14',0),(28,5930918,'2022-07-20 12:17:51',0),(29,5930918,'2022-07-20 12:23:22',0),(30,5930918,'2022-07-20 12:28:54',0),(31,5930918,'2022-07-20 12:30:29',0),(32,5930918,'2022-07-20 12:36:12',0),(33,5930918,'2022-07-20 12:38:01',0),(34,5930918,'2022-07-20 12:41:40',0),(35,5930918,'2022-07-20 12:46:42',0),(36,5930918,'2022-07-20 14:48:21',0),(37,5930918,'2022-07-20 15:59:58',0),(38,159732468,'2022-07-20 16:41:43',1),(39,987456325,'2022-07-20 17:51:45',1),(40,937853724,'2022-07-20 18:16:58',1),(41,5930918,'2022-07-20 19:01:24',0),(42,316081215,'2022-07-21 12:35:51',0),(43,5930918,'2022-07-21 12:38:43',0),(44,5930918,'2022-07-21 12:47:22',0),(45,5930918,'2022-07-21 13:53:04',0),(46,123456789,'2022-07-21 15:23:06',0),(47,123456789,'2022-07-21 15:27:39',0),(48,123456789,'2022-07-21 15:29:20',0),(49,123456789,'2022-07-21 15:48:59',0),(50,123456789,'2022-07-21 15:53:09',1),(51,5930918,'2022-07-21 16:56:44',0),(52,5930918,'2022-07-21 17:02:45',0),(53,5930918,'2022-07-21 17:26:46',0),(54,5930918,'2022-07-21 17:27:20',0),(55,5930918,'2022-07-21 17:27:47',0),(56,5930918,'2022-07-21 17:29:02',0),(57,5930918,'2022-07-21 17:51:39',0),(58,125874933,'2022-07-21 18:01:53',0),(59,125874933,'2022-07-21 18:02:44',0),(60,5930918,'2022-07-21 18:10:43',0),(61,147852258,'2022-07-21 19:10:13',0),(62,147852258,'2022-07-21 19:10:49',0),(63,147852258,'2022-07-21 19:11:38',0),(64,147852258,'2022-07-21 19:12:17',0),(65,147852258,'2022-07-21 19:12:34',1),(66,898554543,'2022-07-21 19:19:59',0),(67,123333333,'2022-07-21 20:24:40',0),(68,123333333,'2022-07-21 20:29:56',1),(69,205989379,'2022-07-21 23:45:59',0),(70,205989379,'2022-07-21 23:47:28',1),(71,5930918,'2022-07-22 15:13:40',0),(72,5930918,'2022-07-22 16:11:03',0),(73,312385729,'2022-07-22 16:52:28',0),(74,312385729,'2022-07-22 16:55:05',1);
/*!40000 ALTER TABLE `carts` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `categories`
--

DROP TABLE IF EXISTS `categories`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `categories` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `categories`
--

LOCK TABLES `categories` WRITE;
/*!40000 ALTER TABLE `categories` DISABLE KEYS */;
INSERT INTO `categories` VALUES (1,'Dairy'),(2,'Meat & Fish'),(3,'Vegetables and Fruit'),(4,'Freezer'),(5,'Bread & bread spreads'),(6,'Dried Goods'),(7,'Snacks'),(8,'Care Products'),(9,'Beverages'),(10,'Cleaners');
/*!40000 ALTER TABLE `categories` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `orders`
--

DROP TABLE IF EXISTS `orders`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `orders` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `cart_id` int NOT NULL,
  `final_price` decimal(5,2) NOT NULL,
  `city` varchar(100) NOT NULL,
  `street` varchar(100) NOT NULL,
  `shipping_date` date NOT NULL,
  `order_date` date NOT NULL,
  `payment_last_digits` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `user_id` (`user_id`),
  KEY `cart_id` (`cart_id`),
  CONSTRAINT `orders_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`),
  CONSTRAINT `orders_ibfk_2` FOREIGN KEY (`cart_id`) REFERENCES `carts` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=65 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `orders`
--

LOCK TABLES `orders` WRITE;
/*!40000 ALTER TABLE `orders` DISABLE KEYS */;
INSERT INTO `orders` VALUES (1,5930918,1,12.00,'Afula','dizengoff 298, 4','2022-07-14','2022-07-05',5645),(2,5930918,2,9.00,'Afula','dizengoff 298, 4','2022-07-14','2022-07-05',5645),(3,5930918,3,12.00,'Afula','dizengoff 298, 4','2022-07-14','2022-07-05',5645),(4,5930918,4,7.00,'Al Buţayḩah','Rabin','2022-07-14','2022-07-05',5645),(5,5930918,5,84.00,'Al Buţayḩah','Rabin','2022-07-06','2022-07-05',5645),(6,5930918,6,78.00,'Tel Aviv-Yafo','Rabin','2022-07-13','2022-07-06',5645),(7,5930918,7,88.40,'Tel Aviv-Yafo','Rabin','2022-07-11','2022-07-07',5645),(8,5930918,8,9.90,'Tel Aviv-Yafo','Rabin','2022-07-13','2022-07-07',5645),(9,5930918,10,32.00,'Tel Aviv-Yafo','Rabin','2022-07-15','2022-07-13',4536),(10,5930918,10,64.80,'Tel Aviv-Yafo','Rabin','2022-07-20','2022-07-13',4536),(11,5930918,11,140.80,'Tel Aviv-Yafo','Rabin','2022-07-20','2022-07-15',5645),(12,5930918,12,9.90,'Afula','Rabin','2022-07-20','2022-07-15',5645),(13,5930918,13,13.50,'Afula','Rabin','2022-07-21','2022-07-15',2353),(14,5930918,14,14.40,'Al Buţayḩah','Rabin','2022-07-19','2022-07-18',8236),(15,5930918,17,9.90,'Afula','Rabin','2022-07-21','2022-07-19',4536),(16,5930918,18,9.90,'Al Buţayḩah','Rabin','2022-07-21','2022-07-19',4536),(17,5930918,19,22.80,'Al Buţayḩah','Rabin','2022-07-19','2022-07-19',8236),(18,5930918,20,35.70,'Afula','Rabin','2022-07-19','2022-07-19',2353),(19,5930918,21,25.80,'Afula','Rabin','2022-07-22','2022-07-19',5645),(20,5930918,22,19.80,'Afula','dizengoff 298, 4','2022-07-22','2022-07-19',8236),(21,5930918,23,19.80,'Afula','Rabin','2022-07-22','2022-07-19',4536),(22,5930918,24,36.00,'Al Buţayḩah','dizengoff 298, 4','2022-07-23','2022-07-19',5645),(23,5930918,25,203.10,'Afula','Rabin','2022-07-23','2022-07-20',8236),(24,5930918,26,62.50,'Al Buţayḩah','Rabin','2022-07-23','2022-07-20',5645),(25,5930918,27,49.60,'Afula','Rabin','2022-07-24','2022-07-20',5645),(26,5930918,28,48.60,'Al Buţayḩah','Rabin','2022-07-26','2022-07-20',8236),(27,5930918,29,183.10,'Akko','Rabin','2022-07-26','2022-07-20',5645),(28,5930918,30,594.60,'Afula','Rabin','2022-07-26','2022-07-20',5645),(29,5930918,31,115.80,'Akko','Rabin','2022-07-27','2022-07-20',8236),(30,5930918,32,131.80,'Afula','Rabin','2022-07-24','2022-07-20',8236),(31,5930918,33,72.50,'Afula','Rabin','2022-07-24','2022-07-20',8236),(32,5930918,34,391.20,'Afula','Rabin','2022-07-25','2022-07-20',5645),(33,5930918,35,285.70,'Tel Aviv-Yafo','Rabin','2022-07-25','2022-07-20',4536),(34,5930918,36,50.20,'Al Buţayḩah','Rabin','2022-07-27','2022-07-20',8236),(35,5930918,37,259.00,'Al Buţayḩah','Rabin','2022-07-30','2022-07-20',5645),(36,5930918,41,41.70,'Afula','dizengoff 298, 4','2022-07-28','2022-07-20',5645),(37,316081215,42,90.40,'Tel Aviv-Yafo','dizengoff 179','2022-07-28','2022-07-21',8236),(38,5930918,43,9.90,'Al Buţayḩah','Rabin','2022-07-28','2022-07-21',2353),(39,5930918,44,9.90,'Akko','Rabin','2022-07-25','2022-07-21',8236),(46,5930918,52,7.90,'Al Buţayḩah','dizengoff 298, 4','2022-07-27','2022-07-21',5645),(47,5930918,53,9.90,'Al Buţayḩah','dizengoff 298, 4','2022-07-29','2022-07-21',5645),(48,5930918,54,4.60,'Al Buţayḩah','Rabin','2022-07-29','2022-07-21',5645),(49,5930918,55,9.90,'Al Buţayḩah','Rabin','2022-07-29','2022-07-21',8236),(50,5930918,56,49.90,'Al Buţayḩah','dizengoff 298, 4','2022-07-30','2022-07-21',5645),(51,125874933,58,9.90,'Afula','nissim aloni 12, 1050','2022-07-30','2022-07-21',5645),(52,125874933,59,9.90,'Afula','nissim aloni 12, 1050','2022-07-31','2022-07-21',5645),(53,5930918,57,19.80,'Al Buţayḩah','Rabin','2022-07-31','2022-07-21',5645),(54,147852258,61,22.80,'Afula','nissim aloni 12, 1050','2022-07-31','2022-07-21',5645),(55,147852258,62,42.80,'Al Khushnīyah','nissim aloni 12, 1050','2022-08-10','2022-07-21',4536),(56,147852258,63,9.90,'Afula','nissim aloni 12, 1050','2022-08-09','2022-07-21',5645),(57,147852258,64,12.90,'Al Buţayḩah','nissim aloni 12, 1050','2022-08-17','2022-07-21',4536),(58,898554543,66,293.40,'Akko','nissim aloni 12, 1050','2022-09-08','2022-07-21',8236),(59,123333333,67,20.90,'Afula','Harimon','2022-08-02','2022-07-21',5645),(60,205989379,69,381.30,'Tel Aviv-Yafo','Micha','2022-09-14','2022-07-21',8236),(61,5930918,60,23.70,'Al Buţayḩah','Rabin','2022-08-30','2022-07-22',5645),(62,5930918,71,162.00,'Tel Aviv-Yafo','Rabin','2022-08-19','2022-07-22',5645),(63,312385729,73,45.40,'Tel Aviv-Yafo','dizengoff 298, 4','2022-08-18','2022-07-22',8236),(64,5930918,72,21.90,'Tel Aviv-Yafo','bla bla','2022-08-25','2022-07-22',4536);
/*!40000 ALTER TABLE `orders` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `products`
--

DROP TABLE IF EXISTS `products`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `products` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  `category_id` int NOT NULL,
  `price` decimal(5,2) NOT NULL,
  `img_url` varchar(100) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `category_id` (`category_id`),
  CONSTRAINT `products_ibfk_1` FOREIGN KEY (`category_id`) REFERENCES `categories` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=229 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `products`
--

LOCK TABLES `products` WRITE;
/*!40000 ALTER TABLE `products` DISABLE KEYS */;
INSERT INTO `products` VALUES (3,'Cream Cheese',1,9.00,'cream-cheese.png'),(4,'Milk 3%',1,7.90,'milk.png'),(5,'Chicken Breast',2,55.00,'chicken-breast.png'),(6,'Fresh Salmon',2,65.00,'fresh-salmon.png'),(8,'Gilt-head bream',2,85.00,'gilt-head-bream.png'),(35,'Artichoke',3,12.00,'artichoke.png'),(36,'Broccoli',3,12.00,'broccoli.png'),(37,'Capers',3,7.00,'capers.png'),(38,'Cauliflower',3,5.00,'cauliflower.png'),(39,'Avocado',3,9.00,'avocado.png'),(40,'Green bean',3,6.00,'green-bean.png'),(41,'Corn',3,4.00,'corn.png'),(42,'Cucumber',3,6.00,'cucumber.png'),(43,'Eggplant',3,5.00,'eggplant.png'),(44,'Olives',3,4.00,'olives.png'),(45,'Pumpkin',3,6.00,'pumpkin.png'),(46,'Tomato',3,7.00,'tomato.png'),(47,'Zucchini',3,9.00,'zucchini.png'),(49,'Cabbage',3,10.00,'cabbage.png'),(50,'Mey eden',9,14.00,'mey-eden.png'),(51,'Neviot',9,11.00,'neviot.png'),(52,'Kinley soda',9,15.00,'kinley-soda.png'),(53,'Sanpellegrino',9,8.00,'sanpellegrino.png'),(54,'Red Bull',9,21.00,'redbull.png'),(55,'XL energy drink',9,4.00,'xl.png'),(56,'White potato',3,22.00,'white-potato.jpeg'),(57,'Carrot',3,8.00,'carrot.png'),(58,'Frozen entrecote ',4,30.00,'\nfrozen-entrecote.png'),(59,'Frozen burger',4,30.00,'frozen-burger.png'),(60,'Frozen Salmon',4,80.00,'frozen-salmon.png'),(61,'Frozen Tuna',4,40.00,'frozen-tuna.png'),(62,'Frozen green Beans',4,10.00,'frozen-green-bean.png'),(63,'Frozen dwarf carrots',4,8.00,'frozen-dwarf-carrots.png'),(64,'Frozen bean',4,19.00,'frozen-bean.png'),(65,'Frozen corn seeds',4,20.00,'frozen-corn-seeds.png'),(66,'Frozen puff pastry',4,23.00,'frozen-puff-pastry.png'),(74,'Tangerine',3,4.90,'tangerine.jpg'),(75,'Garlic',3,9.90,'garlic.jpg'),(76,'Mint',3,3.90,'mint.jpg'),(77,'Milk 1%',1,6.00,'milk1.png'),(78,'Chocolate milk',1,11.90,'bottled-chocolate-milk.png'),(79,'Yogurt with pecan',1,4.50,'yogurt-with-pecan.png'),(80,'Yogurt 1.7%',1,3.30,'yogurt17.png'),(81,'Go strawberry',1,4.50,'go-strawberry.png'),(82,'Pro vanilla',1,4.50,'pro-vanilla.png'),(83,'Entrecote',2,129.00,'entrecote.png'),(84,'Tomahawk steak',2,119.00,'tomahawk-steak.png'),(85,'Ground beef',2,59.90,'ground-beef.png'),(86,'Sirloin steak',2,99.90,'sirloin-steak.png'),(87,'bone marrow',2,49.90,'brain-bone-beef.png'),(88,'Fresh lamb chops',2,199.90,'fresh-lamb-chops.png'),(89,'Whole wheat bread',5,14.90,'whole-wheat-bread.png'),(90,'Sliced white bread',5,9.90,'sliced-white-bread.png'),(91,'Pitas x5 ',5,5.00,'pita.png'),(92,'Baguette',5,3.00,'baguette.png'),(93,'Tortillas',5,9.90,'tortillas.png'),(94,'Eggs L',1,11.30,'large-eggs.png'),(95,'Eggs M',1,10.30,'eggs.png'),(96,'Cherry jam',5,12.90,'cherry-jam.png'),(97,'Strawberry jam',5,12.90,'strawberry-jam.png'),(98,'Orange jam',5,12.90,'orange-jam.png'),(99,'Maple syrup',5,19.90,'maple-syrup.png'),(100,'Pure honey',5,19.90,'pure-honey.png'),(101,'Date Honey',5,9.90,'date-honey.png'),(102,'Ground ginger',6,13.90,'ground-ginger.png'),(103,'Hawaij for coffe',6,15.90,'hawaij-for-coffe.png'),(104,'Hawaij for soup',6,15.90,'hawaij-for-soup.png'),(105,'Coarse salt',6,11.90,'coarse-salt.png'),(106,'Turmeric',6,13.90,'turmeric.png'),(107,'Ground cumin',6,13.90,'ground-cumin.png'),(108,'Thin salt',6,8.90,'thin-salt.png'),(109,'Black pepper',6,13.90,'black-pepper.png'),(110,'Sweet paprika',6,13.90,'sweet-paprika.png'),(111,'Spicy paprika',6,13.90,'spicy-paprika.png'),(112,'Indian curry',6,15.90,'indian-curry.png'),(114,'Majhūl date ',6,19.90,'majhul-date.png'),(115,'Dried plum',6,18.90,'dried-plum.png'),(116,'Dried cranberries',6,12.90,'dried-cranberries.png'),(117,'Dried pineapple',6,7.90,'dried-pineapple.png'),(118,'Dried apricot',6,7.90,'dried-apricot.png'),(119,'Banana chips',6,7.90,'banana-chips.png'),(120,'Milk Chocolate',7,17.90,'milk-chocolate.png'),(121,'Bitter chocolate',7,17.90,'bitter-chocolate.png'),(122,'White chocolate',7,7.50,'white-chocolate.png'),(123,'Oreo sandwich',7,7.50,'oreo-sandwich.png'),(124,'Cookies and cream',7,7.90,'cookies-and-cream.png'),(125,'Twix',7,3.90,'twix.png'),(126,'Bounty',7,3.90,'bounty.png'),(127,'Snickers',7,3.90,'snickers.png'),(128,'M&M Peanuts',7,4.90,'m&m-peanuts.png'),(129,'M&M Peanut Butter',7,4.90,'m&m-peanut-butter.png'),(130,'Kinder bueno',7,3.90,'kinder-bueno.png'),(131,'Bissli grill',7,4.30,'bisli.png'),(132,'Bissli barbecue',7,4.30,'bissli-barbecue.png'),(133,'Bissli onion',7,4.30,'bissli-onion.png'),(134,'Bissli pizza',7,4.30,'bissli-pizza.png'),(135,'Bissli&Bamba mix',7,4.40,'bissli-bamba-mix.png'),(136,'Bamba',7,4.50,'bamba.png'),(137,'Bamba strawberry',7,2.30,'bamba-strawberry.png'),(138,'Butter popcorn',7,12.90,'butter-popcorn.png'),(139,'Natural popcorn',7,12.90,'natural-popcorn.png'),(140,'Caffeine shampoo',8,53.90,'caffeine-shampoo.png'),(141,'Shampoo',8,11.90,'shampoo.png'),(142,'Dandruff shampoo',8,69.90,'dandruff-shampoo.png'),(143,'Head and shoulders',8,18.90,'head-and-shoulders.png'),(144,'Head and shoulders',8,18.90,'head-and-shoulders-apple.png'),(145,'Head and shoulders',8,18.90,'head-and-shoulders-mint.png'),(146,'Aloe vera shampoo',8,12.00,'aloe-vera-shampoo.png'),(147,'Shampoo for curls',8,18.90,'shampoo-for-curls.png'),(148,'Hair conditioner',8,11.90,'hair-conditioner.png'),(149,'Hair conditioner',8,13.90,'hair-conditioner1.png'),(150,'Hair conditioner',8,12.90,'hair-conditioner2.png'),(151,'Repair conditioner',8,15.90,'repair-conditioner.png'),(152,'Berry bath lotion',8,10.90,'berry-bath-lotion.png'),(153,'Shower gel',8,10.90,'shower-gel.png'),(154,'Beauty cream bar',8,12.90,'beauty-cream-bar.png'),(155,'Go fresh bar',8,12.90,'go-fresh-bar.png'),(156,'Deodorant spray',8,49.00,'deodorant-spray.png'),(157,'Deodorant roll',8,49.00,'deodorant-roll.png'),(158,'Deodorant Stick',8,14.90,'deodorant-stick.png'),(159,'Deodorant gel',8,30.00,'deodorant-gel.png'),(160,'Deodorant wipes',8,4.90,'deodorant-wipes.png'),(161,'Deodorant wipes',8,4.90,'deodorant-wipes1.png'),(162,'Protection lotion',8,24.90,'protection-lotion50.png'),(163,'Protection lotion',8,19.90,'protection-lotion30.png'),(164,'Haircut machine',8,69.90,'haircut-machine.png'),(165,'Razors for women',8,44.90,'razors-for-women.png'),(166,'Razors for men',8,59.90,'razors-for-men.png'),(167,'Shaving foam',8,14.90,'shaving-foam.png'),(168,'Shaving cream',8,12.90,'shaving-cream.png'),(169,'Colon water',8,39.90,'colon-water.png'),(170,'Hair removal wax',8,12.90,'hair-removal-wax.png'),(171,'Toothpaste',8,15.90,'toothpaste.png'),(172,'Mouthwash',8,19.90,'mouthwash.png'),(173,'Dental floss',8,33.00,'dental-floss.png'),(174,'Toothbrush',8,4.90,'toothbrush.png'),(175,'Toothpicks',8,9.90,'toothpicks.png'),(176,'Wooden Toothpicks',8,2.90,'toothpicks1.png'),(177,'Q-tips',8,3.90,'qtips.png'),(178,'Vaseline',8,18.90,'vaseline.png'),(179,'Moisturizer',8,12.90,'moisturizer.png'),(180,'Hand cream',8,12.90,'hand-cream.png'),(181,'Alcohol 70%',8,4.60,'70alcohol.png'),(182,'Plasters',8,4.50,'plaster.png'),(183,'Earplugs',8,29.90,'earplugs.png'),(184,'Coca cola zero',9,46.50,'coca-cola-zero.png'),(185,'Coca cola',9,49.90,'coca-cola.png'),(186,'Sprite',9,49.90,'sprite.png'),(187,'Sprite zero',9,46.50,'sprite-zero.png'),(188,'Fanta orange',9,35.90,'fanta-orange.png'),(189,'Pepsi',9,41.90,'pepsi.png'),(190,'Pepsi max',9,37.90,'pepsi-max.png'),(191,'Orange juice',9,16.90,'orange-juice.png'),(192,'Corona beer',9,8.00,'corona.png'),(193,'Carlsberg beer',9,8.00,'carlsberg.png'),(194,'Heineken beer',9,8.00,'heineken.png'),(195,'Elite arak',9,53.90,'elite-arak.png'),(196,'Ouzo 12',9,79.90,'ouzo12.png'),(197,'Finlandia vodka',9,49.90,'finlandia.png'),(198,'Beluga vodka',9,159.90,'beluga.png'),(199,'Hendricks gin',9,159.00,'hendricks.png'),(200,'Patron silver',9,199.00,'patron-silver.png'),(201,'Patrón Añejo',9,235.00,'patron-anejo.png'),(202,'Alco-gel',10,9.90,'alco-gel.png'),(203,'Toilet Paper',10,33.90,'toilet-paper.png'),(204,'Toilet wipes',10,12.90,'toilet-wipes.png'),(205,'Paper towels',10,12.90,'paper-towels.png'),(206,'Washing gel',10,34.90,'washing-gel.png'),(207,'Washing Powder',10,26.90,'washing-powder.png'),(208,'Softener',10,19.90,'softener.png'),(209,'Dishwashing liquid',10,4.90,'dishwashing-liquid.png'),(210,'Garbage bags',10,19.90,'garbage-bags.png'),(211,'Broom',10,6.00,'broom.png'),(212,'Mop',10,6.00,'mop.png'),(213,'Mango',3,11.90,'mango.png'),(214,'Watermelon',3,7.00,'watermelon.png'),(215,'Anona',3,5.00,'anona.png'),(216,'Asparagus',3,11.00,'asparagus.png'),(217,'Peach',3,4.00,'peach.png'),(218,'Okra',3,7.00,'okra.png'),(220,'Cooked beets',3,9.90,'cooked-beets.png'),(221,'Coconut',3,8.00,'coconut.png'),(222,'Pomegranate',3,10.90,'pomegranate.png'),(226,'Orange',3,4.90,'orange.png');
/*!40000 ALTER TABLE `products` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` int NOT NULL,
  `email` varchar(45) NOT NULL,
  `first_name` varchar(45) NOT NULL,
  `last_name` varchar(45) NOT NULL,
  `password` varchar(45) NOT NULL,
  `city` varchar(100) DEFAULT NULL,
  `street` varchar(100) DEFAULT NULL,
  `role` varchar(40) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `user_name_UNIQUE` (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'admin@gmail.com','Main','Admin','e2d2af960ada70e65297bec6a535e705',NULL,NULL,'admin'),(5930918,'raz1@gmail.com','raz','oren','e2d2af960ada70e65297bec6a535e705','Tel-Aviv','Rabin','user'),(123333333,'barak345@gmail.com','Raz','Oren','e2d2af960ada70e65297bec6a535e705','Akko','Harimon','user'),(123454321,'maori@gmail.com','asdasd','asdasd','e2d2af960ada70e65297bec6a535e705','Afula','asdasd','user'),(123456789,'maor@gmail.com','Maor','Nidam','e2d2af960ada70e65297bec6a535e705','Akko','dwqdwq','user'),(125874933,'testcart@gmail.com','may','cohen','e2d2af960ada70e65297bec6a535e705','Al Buţayḩah','nissim aloni 12, 1050','user'),(126452678,'rrr@gmail.com','Raz','Oren','fbafe7ed3997b1695397bbe0f6164ae3','Tel Aviv-Yafo','nissim aloni 12, 1050','user'),(147852258,'raz94@gmail.com','may','cohen','e2d2af960ada70e65297bec6a535e705','Afula','nissim aloni 12, 1050','user'),(159732468,'blabla@gmail.com','Raz','Oren','e2d2af960ada70e65297bec6a535e705','Tel Aviv-Yafo','dizengoff 298, 4','user'),(205989379,'matan@gmail.com','Matan','Brichta','e2d2af960ada70e65297bec6a535e705','Tel Aviv-Yafo','Micha','user'),(312385729,'itai@gmail.com','Itai','Reshef','e2d2af960ada70e65297bec6a535e705','Tel Aviv-Yafo','dizengoff 298, 4','user'),(316081215,'din@zakay.biz','din','zakay','2a5f984fe0eb8d052178b82efe5def4b','Tel Aviv-Yafo','dizengoff 179','user'),(898554543,'heziroee@gmail.com','roy','hezi','e2d2af960ada70e65297bec6a535e705','Akko','74543','user'),(937853722,'razoren94@gmail.com','Raz','Oren','e2d2af960ada70e65297bec6a535e705','Afula','dizengoff 298, 4','user'),(937853724,'raz789@gmail.com','Raz','Nehoray','e2d2af960ada70e65297bec6a535e705','Afula','Dizzengof','user'),(937853733,'rrrr@gmail.com','Raz','Oren','e2d2af960ada70e65297bec6a535e705','Al Buţayḩah','dizengoff 298, 4','user'),(937853742,'razzz@gmail.com','Raz','Oren','e2d2af960ada70e65297bec6a535e705','Afula','dizengoff 298, 4','user'),(987456325,'testing@gmail.com','tester','Oren','e2d2af960ada70e65297bec6a535e705','Akko','dizengoff 298, 4','user');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2022-07-22 17:08:02
