/*
Created: 27/10/2019
Modified: 27/10/2019
Model: MySQL 5.0
Database: MySQL 5.0
*/

-- Create tables section -------------------------------------------------

-- Table repartidor

CREATE TABLE `repartidor`
(
  `idRepartidor` Int NOT NULL AUTO_INCREMENT,
  `usuarioRepartidor` Char(20) NOT NULL,
  `nombreRepartidor` Char(20) NOT NULL,
  `numTelRepartidor` Char(20) NOT NULL,
  `passRepartidor` Char(20) NOT NULL,
  PRIMARY KEY (`idRepartidor`)
)
;

-- Table cliente

CREATE TABLE `cliente`
(
  `idCliente` Int NOT NULL AUTO_INCREMENT,
  `nombreCliente` Varchar(50),
  `direccionCliente` Varchar(100),
  `numTelCliente` Char(20),
  PRIMARY KEY (`idCliente`)
)
;

-- Table productos

CREATE TABLE `productos`
(
  `idProducto` Int NOT NULL AUTO_INCREMENT,
  `nombreProducto` Char(20),
  `cantProducto` Int,
  `precioProducto` Decimal(10,2),
  PRIMARY KEY (`idProducto`)
)
;

-- Table citas

CREATE TABLE `citas`
(
  `idCita` Int NOT NULL AUTO_INCREMENT,
  `fechaCita` Datetime,
  `descCita` Char(20),
  `estatusCita` Char(20),
  `idCliente` Int NOT NULL,
  PRIMARY KEY (`idCita`,`idCliente`)
)
;

-- Table clientes

CREATE TABLE `clientes`
(
  `idRepartidor` Int NOT NULL,
  `idCliente` Int NOT NULL,
  `idClientes` Int NOT NULL
)
;

ALTER TABLE `clientes` ADD PRIMARY KEY (`idRepartidor`,`idCliente`,`idClientes`)
;

-- Table ventas

CREATE TABLE `ventas`
(
  `idCliente` Int NOT NULL,
  `idProducto` Int NOT NULL,
  `idVenta` Int NOT NULL AUTO_INCREMENT,
  `cantProd` Int,
  `precioVenta` Decimal(10,2),
  `totalVenta` Decimal(10,2),
  PRIMARY KEY (`idCliente`,`idProducto`,`idVenta`)
)
;

-- Create foreign keys (relationships) section -------------------------------------------------

ALTER TABLE `clientes` ADD CONSTRAINT `Relationship1` FOREIGN KEY (`idRepartidor`) REFERENCES `repartidor` (`idRepartidor`) ON DELETE RESTRICT ON UPDATE RESTRICT
;

ALTER TABLE `clientes` ADD CONSTRAINT `Relationship2` FOREIGN KEY (`idCliente`) REFERENCES `cliente` (`idCliente`) ON DELETE RESTRICT ON UPDATE RESTRICT
;

ALTER TABLE `citas` ADD CONSTRAINT `Relationship3` FOREIGN KEY (`idCliente`) REFERENCES `cliente` (`idCliente`) ON DELETE RESTRICT ON UPDATE RESTRICT
;

ALTER TABLE `ventas` ADD CONSTRAINT `Relationship4` FOREIGN KEY (`idCliente`) REFERENCES `cliente` (`idCliente`) ON DELETE RESTRICT ON UPDATE RESTRICT
;

ALTER TABLE `ventas` ADD CONSTRAINT `Relationship5` FOREIGN KEY (`idProducto`) REFERENCES `productos` (`idProducto`) ON DELETE RESTRICT ON UPDATE RESTRICT
;


