-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Apr 12, 2023 at 08:38 PM
-- Server version: 10.4.27-MariaDB
-- PHP Version: 8.2.0

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `student_db`
--

-- --------------------------------------------------------

--
-- Table structure for table `c_data`
--

CREATE TABLE `c_data` (
  `course_code` int(11) NOT NULL,
  `course_name` varchar(200) NOT NULL,
  `credit` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `c_data`
--

INSERT INTO `c_data` (`course_code`, `course_name`, `credit`) VALUES
(1001, 'English for Communication 1', 3),
(1002, 'Engineering Mathematics', 6),
(1003, 'Engineering Physics 1', 3),
(1004, 'Engineering Chemistry 1', 3),
(1008, 'Computer Fundamentals', 4),
(1009, 'Health & Physical Education', 2),
(2001, '	English for Communication II', 3),
(2002, 'Engineering Mathematics II', 6),
(2003, 'Engineering Physics II', 3),
(2004, 'Engineering Chemistry II', 3),
(2005, 'Engineering Graphics', 5),
(2007, '	Engineering Science Lab II', 3),
(2008, '	Workshop Practice', 3),
(2009, '	Life Skill', 2),
(2131, 'Programming in C', 4),
(2139, 'Programming in C Lab', 2),
(3001, '	Environmental Science & Disaster Management', 3),
(3131, 'Computer Architecture', 4),
(3132, '	Database Management System', 4),
(3133, '	Digital Computer Principles', 4),
(3134, 'Object Oriented Programming through C++', 5),
(3137, '	Object Oriented Programming Lab', 3),
(3138, 'Digital Computer Principles Lab', 3),
(3139, '	Database Management System Lab', 3);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
