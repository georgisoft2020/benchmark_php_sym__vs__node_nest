CREATE TABLE IF NOT EXISTS `benchmark_items` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `value` text,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `name_idx` (`name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Add some initial data
INSERT INTO `benchmark_items` (`name`, `value`) VALUES
('item1', 'This is test value 1'),
('item2', 'This is test value 2'),
('item3', 'This is test value 3'),
('item4', 'This is test value 4'),
('item5', 'This is test value 5');