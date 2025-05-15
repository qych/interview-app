-- TODO #6: Link teacher to classes. Every class must be assigned 1 teacher as form teacher

CREATE TABLE IF NOT EXISTS `Teacher` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `uuid` varchar(21) NOT NULL,
  `name` varchar(255) NOT NULL,
  `subject` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `contactNumber` varchar(8) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `uuid_UNIQUE` (`uuid`),
  UNIQUE KEY `email_UNIQUE` (`email`)
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS `Class` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `uuid` varchar(21) NOT NULL,
  `level` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `uuid_UNIQUE` (`uuid`),
  UNIQUE KEY `name_UNIQUE` (`name`)
) ENGINE=InnoDB;
