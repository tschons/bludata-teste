-- MySQL dump 10.16  Distrib 10.1.37-MariaDB, for Linux (x86_64)
--
-- Host: 127.0.0.1    Database: bludata
-- ------------------------------------------------------
-- Server version	10.1.37-MariaDB

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
-- Table structure for table `empresas`
--

DROP TABLE IF EXISTS `empresas`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `empresas` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `estado_id` int(11) NOT NULL,
  `nome_fant` varchar(80) COLLATE utf8mb4_unicode_ci NOT NULL,
  `cnpj` char(18) COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`id`),
  KEY `empresas_estados_id_fk` (`estado_id`),
  CONSTRAINT `empresas_estados_id_fk` FOREIGN KEY (`estado_id`) REFERENCES `0c650fd7fc0b6ffb5b5ad7ebc0b2dfb4`.`estados` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `empresas`
--

LOCK TABLES `empresas` WRITE;
/*!40000 ALTER TABLE `empresas` DISABLE KEYS */;
INSERT INTO `empresas` VALUES (9,1,'Beto Soluções Elétricas e Hidráulicas','03.902.674/0001-70'),(10,24,'Big Pizza','97.462.031/0001-04'),(11,17,'Transportadora Paraná','99.031.846/0001-56'),(12,25,'Padaria São João','01.263.407/0001-74'),(13,4,'Maria Suplementos','31.043.899/0001-53');
/*!40000 ALTER TABLE `empresas` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `estados`
--

DROP TABLE IF EXISTS `estados`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `estados` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nome` varchar(40) COLLATE utf8mb4_unicode_ci NOT NULL,
  `sigla` char(2) COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `ufs_sigla_uindex` (`sigla`)
) ENGINE=InnoDB AUTO_INCREMENT=28 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `estados`
--

LOCK TABLES `estados` WRITE;
/*!40000 ALTER TABLE `estados` DISABLE KEYS */;
INSERT INTO `estados` VALUES (1,'Rio Grande do Sul','RS'),(2,'Acre','AC'),(3,'Alagoas','AL'),(4,'Amapá','AP'),(5,'Amazonas','AM'),(6,'Bahia','BA'),(7,'Ceará','CE'),(8,'Distrito Federal','DF'),(9,'Espírito Santo','ES'),(10,'Goiás','GO'),(11,'Maranhão','MA'),(12,'Mato Grosso','MT'),(13,'Mato Grosso do Sul','MS'),(14,'Minas Gerais','MG'),(15,'Pará','PA'),(16,'Paraíba','PB'),(17,'Paraná','PR'),(18,'Pernambuco','PE'),(19,'Piauí','PI'),(20,'Rio de Janeiro','RJ'),(21,'Rio Grande do Norte','RN'),(22,'Rondônia','RO'),(23,'Roraima','RR'),(24,'Santa Catarina','SC'),(25,'São Paulo','SP'),(26,'Sergipe','SE'),(27,'Tocantins','TO');
/*!40000 ALTER TABLE `estados` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `forn_pess_fisica`
--

DROP TABLE IF EXISTS `forn_pess_fisica`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `forn_pess_fisica` (
  `forn_id` int(11) NOT NULL,
  `rg` char(12) COLLATE utf8mb4_unicode_ci NOT NULL,
  `data_nasc` date NOT NULL,
  `cpf` char(14) COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`forn_id`),
  UNIQUE KEY `forn_pess_fisica_forn_id_uindex` (`forn_id`),
  UNIQUE KEY `forn_pess_fisica_rg_uindex` (`rg`),
  UNIQUE KEY `forn_pess_fisica_cpf_uindex` (`cpf`),
  CONSTRAINT `forn_pess_fisica_fornecedores_id_fk` FOREIGN KEY (`forn_id`) REFERENCES `fornecedores` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `forn_pess_fisica`
--

LOCK TABLES `forn_pess_fisica` WRITE;
/*!40000 ALTER TABLE `forn_pess_fisica` DISABLE KEYS */;
INSERT INTO `forn_pess_fisica` VALUES (18,'5465467537','1996-01-10','345.437.920-25'),(19,'3454364265','1990-03-27','712.839.990-99');
/*!40000 ALTER TABLE `forn_pess_fisica` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `forn_pess_juridica`
--

DROP TABLE IF EXISTS `forn_pess_juridica`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `forn_pess_juridica` (
  `forn_id` int(11) NOT NULL,
  `cnpj` char(18) COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`forn_id`),
  UNIQUE KEY `forn_pess_juridica_forn_id_uindex` (`forn_id`),
  UNIQUE KEY `forn_pess_juridica_cnpj_uindex` (`cnpj`),
  CONSTRAINT `forn_pess_juridica_fornecedores_id_fk` FOREIGN KEY (`forn_id`) REFERENCES `fornecedores` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `forn_pess_juridica`
--

LOCK TABLES `forn_pess_juridica` WRITE;
/*!40000 ALTER TABLE `forn_pess_juridica` DISABLE KEYS */;
INSERT INTO `forn_pess_juridica` VALUES (17,'95.884.489/0001-18');
/*!40000 ALTER TABLE `forn_pess_juridica` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `fornecedores`
--

DROP TABLE IF EXISTS `fornecedores`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `fornecedores` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nome` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `data_cad` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `emp_id` int(11) NOT NULL,
  `tipo` char(1) COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fornecedores_empresas_id_fk` (`emp_id`),
  CONSTRAINT `fornecedores_empresas_id_fk` FOREIGN KEY (`emp_id`) REFERENCES `empresas` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=20 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `fornecedores`
--

LOCK TABLES `fornecedores` WRITE;
/*!40000 ALTER TABLE `fornecedores` DISABLE KEYS */;
INSERT INTO `fornecedores` VALUES (17,'Fornecedor Paraná','2018-12-04 16:10:51',11,'J'),(18,'Pedro Fornecedor','2018-12-04 16:12:36',10,'F'),(19,'Entregador Pedro','2018-12-04 16:15:16',10,'F');
/*!40000 ALTER TABLE `fornecedores` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `telefones`
--

DROP TABLE IF EXISTS `telefones`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `telefones` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `numero` varchar(14) COLLATE utf8mb4_unicode_ci NOT NULL,
  `forn_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `telefones_fornecedores_id_fk` (`forn_id`),
  CONSTRAINT `telefones_fornecedores_id_fk` FOREIGN KEY (`forn_id`) REFERENCES `fornecedores` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=34 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `telefones`
--

LOCK TABLES `telefones` WRITE;
/*!40000 ALTER TABLE `telefones` DISABLE KEYS */;
INSERT INTO `telefones` VALUES (31,'(56)65476-5376',19),(32,'(56)34432-4321',19),(33,'(45)43543-2654',18);
/*!40000 ALTER TABLE `telefones` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2018-12-04 14:27:44
