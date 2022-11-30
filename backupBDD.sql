-- MySQL dump 10.13  Distrib 8.0.31, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: db_obligatorio2dda
-- ------------------------------------------------------
-- Server version	5.7.40-log

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
-- Table structure for table `clientes`
--

DROP TABLE IF EXISTS `clientes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `clientes` (
  `ci` bigint(20) NOT NULL,
  `email` varchar(30) DEFAULT NULL,
  `lastname` varchar(30) DEFAULT NULL,
  `name` varchar(30) DEFAULT NULL,
  `tipo` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`ci`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `clientes`
--

LOCK TABLES `clientes` WRITE;
/*!40000 ALTER TABLE `clientes` DISABLE KEYS */;
INSERT INTO `clientes` VALUES (45003983,'gerramouspe@ctc.edu.uy','Erramouspe','Gustavo','PREMIUM'),(48349834,'jgimenez@gmail.com','Giménez','Jose','STANDARD'),(51213050,'fedebonjour123@gmail.com','Bonjour','Federico','PREMIUM'),(53194149,'agustinmaciel0810@gmail.com','Maciel','Agustin','STANDARD'),(53788390,'crodriguez@ctc.edu.uy','Rodriguez','Carlos','PREMIUM'),(55838930,'arodriguez@gmail.com','Rodriguez','Agustin','STANDARD');
/*!40000 ALTER TABLE `clientes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `compras`
--

DROP TABLE IF EXISTS `compras`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `compras` (
  `id_compra` bigint(20) NOT NULL AUTO_INCREMENT,
  `ci` bigint(20) DEFAULT NULL,
  `id` int(11) DEFAULT NULL,
  `precio_total` double NOT NULL,
  PRIMARY KEY (`id_compra`)
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `compras`
--

LOCK TABLES `compras` WRITE;
/*!40000 ALTER TABLE `compras` DISABLE KEYS */;
INSERT INTO `compras` VALUES (1,51213050,1,600),(2,45003983,1,600),(3,45003983,2,3000),(4,45003983,3,1000),(5,48349834,4,15000),(6,51213050,3,1000),(7,51213050,2,3000),(8,53194149,1,600),(9,53194149,4,15000),(10,53788390,4,15000),(11,53788390,3,1000),(12,53788390,1,600),(13,53788390,2,2400),(14,55838930,2,3000);
/*!40000 ALTER TABLE `compras` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `images`
--

DROP TABLE IF EXISTS `images`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `images` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `image_data` longblob,
  `name` varchar(255) DEFAULT NULL,
  `plan_id` bigint(20) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `images`
--

LOCK TABLES `images` WRITE;
/*!40000 ALTER TABLE `images` DISABLE KEYS */;
/*!40000 ALTER TABLE `images` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `planes_viaje`
--

DROP TABLE IF EXISTS `planes_viaje`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `planes_viaje` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `cost` double DEFAULT NULL,
  `date` datetime(6) DEFAULT NULL,
  `destiny` varchar(20) DEFAULT NULL,
  `modality` varchar(255) DEFAULT NULL,
  `pictures` tinyblob,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `planes_viaje`
--

LOCK TABLES `planes_viaje` WRITE;
/*!40000 ALTER TABLE `planes_viaje` DISABLE KEYS */;
INSERT INTO `planes_viaje` VALUES (1,600,'2022-12-01 23:08:56.000000','Montevideo','TERRESTRE',NULL),(2,3000,'2022-12-03 23:12:51.000000','Buenos Aires','MARITIMA',NULL),(3,1000,'2022-12-04 23:12:51.000000','Rocha','TERRESTRE',NULL),(4,15000,'2022-12-06 23:12:51.000000','Santigo De Chile','AEREA',NULL);
/*!40000 ALTER TABLE `planes_viaje` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2022-11-30 20:20:21
