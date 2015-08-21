-- phpMyAdmin SQL Dump
-- version 4.4.12
-- http://www.phpmyadmin.net
--
-- Host: localhost
-- Generation Time: Aug 21, 2015 at 12:33 PM
-- Server version: 10.0.20-MariaDB-log
-- PHP Version: 5.6.11

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `phalconrest`
--

-- --------------------------------------------------------

--
-- Table structure for table `content`
--

CREATE TABLE IF NOT EXISTS `content` (
  `id_content` int(11) NOT NULL,
  `id_kategori` int(11) NOT NULL,
  `id_user` int(11) NOT NULL,
  `judul` varchar(35) NOT NULL,
  `body` text NOT NULL,
  `type` int(1) NOT NULL,
  `deskripsi` text NOT NULL,
  `status` int(1) NOT NULL,
  `uploadedAt` datetime NOT NULL
) ENGINE=InnoDB AUTO_INCREMENT=65 DEFAULT CHARSET=utf8;

--
-- Dumping data for table `content`
--

INSERT INTO `content` (`id_content`, `id_kategori`, `id_user`, `judul`, `body`, `type`, `deskripsi`, `status`, `uploadedAt`) VALUES
(41, 1, 1, 'neovim', 'data/ZFmouJJZli/ZFmouJJZli.png', 1, 'dsf', 1, '2015-08-14 00:00:00'),
(42, 1, 1, 'sfd', 'data/pygonhaKh8/pygonhaKh8.jpg', 1, 'sfd', 1, '2015-08-14 00:00:00'),
(43, 1, 1, 'dsf', 'data/ToipXS0YqU/ToipXS0YqU.jpg', 1, 'vgn', 1, '2015-08-14 00:00:00'),
(44, 1, 1, 'sgdf', 'data/uMM7c6iFjM/uMM7c6iFjM.jpg', 1, 'dsfg', 1, '2015-08-14 00:00:00'),
(45, 1, 1, 'sdf', 'data/vOWkvfEBN0/vOWkvfEBN0.jpg', 1, 'sdf', 1, '2015-08-14 00:00:00'),
(46, 1, 1, 'saa', 'data/Eu19KScaRz/Eu19KScaRz.gif', 1, 'asd', 1, '2015-08-14 00:00:00'),
(47, 1, 1, 'sfd', 'https://www.youtube.com/watch?v=CduA0TULnow', 2, 'sadfsadf', 1, '2015-08-14 00:00:00'),
(48, 1, 1, 'Mirror', 'https://www.youtube.com/watch?v=uuZE_IRwLNI', 2, 'asd', 1, '2015-08-14 00:00:00'),
(49, 1, 1, 'Her go', 'https://www.youtube.com/watch?v=RBumgq5yVrA', 2, 'dsa', 1, '2015-08-14 00:00:00'),
(50, 1, 1, 'Bruno', 'https://www.youtube.com/watch?v=LjhCEhWiKXk', 2, 'asd', 1, '2015-08-14 00:00:00'),
(51, 1, 1, 'sad', 'https://www.youtube.com/watch?v=3gOHvDP_vCs', 2, 'asd', 1, '2015-08-14 00:00:00'),
(52, 7, 1, 'asf', 'https://soundcloud.com/laszlomusic/laszlo-fall-to-light', 3, 'asd', 1, '2015-08-14 00:00:00'),
(53, 1, 1, 'sd', 'data/QbHwFBO0fr/QbHwFBO0fr.jpg', 1, 'sda', 1, '2015-08-15 00:00:00'),
(54, 1, 1, 'zfds', 'data/WAr07tUgEk/WAr07tUgEk.jpg', 1, 'sdf', 1, '2015-08-15 00:00:00'),
(55, 1, 1, 'ghhv', 'data/tP1OE8KB4d/tP1OE8KB4d.png', 1, 'kjhjh', 1, '2015-08-15 00:00:00'),
(56, 1, 1, 'fghjk', 'data/XR8qckWG6h/XR8qckWG6h.jpg', 1, 'vbnm', 1, '2015-08-15 00:00:00'),
(57, 1, 1, 'neovim', 'data/7rHUbMbflu/7rHUbMbflu.jpg', 1, 'dsf', 1, '2015-08-21 00:00:00'),
(58, 1, 1, 'neovim', 'data/7rHUbMbflu/7rHUbMbflu.jpg', 1, 'dsf', 1, '2015-08-21 00:00:00'),
(59, 1, 1, 'neovim', 'data/7rHUbMbflu/7rHUbMbflu.jpg', 1, 'dsf', 1, '2015-08-21 00:00:00'),
(60, 1, 1, 'rtttt', 'data/DJGiPKL4QQ/DJGiPKL4QQ.jpg', 1, 'sadasd', 1, '2015-08-21 00:00:00'),
(61, 1, 1, 'sfd', 'data/kO06yFK2FI/kO06yFK2FI.jpg', 1, 'asfd', 1, '2015-08-21 00:00:00'),
(62, 1, 1, 'sdf', 'data/VZnXzJBVxL/VZnXzJBVxL.jpg', 1, 'asdf', 1, '2015-08-21 00:00:00'),
(63, 1, 1, 'asdf', 'data/OL0iwuqgbM/OL0iwuqgbM.png', 1, 'sadf', 1, '2015-08-21 00:00:00'),
(64, 1, 1, 'neovim', 'data/vtd0uBJA2R/vtd0uBJA2R.png', 1, 'dsf', 1, '2015-08-21 00:00:00');

-- --------------------------------------------------------

--
-- Table structure for table `event`
--

CREATE TABLE IF NOT EXISTS `event` (
  `id_event` int(11) NOT NULL,
  `judul` varchar(25) NOT NULL,
  `deskripsi` text NOT NULL,
  `gambar` varchar(25) NOT NULL,
  `tanggal` datetime NOT NULL,
  `alamat` text NOT NULL,
  `koordinat` varchar(100) DEFAULT NULL,
  `status` int(1) NOT NULL
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8;

--
-- Dumping data for table `event`
--

INSERT INTO `event` (`id_event`, `judul`, `deskripsi`, `gambar`, `tanggal`, `alamat`, `koordinat`, `status`) VALUES
(12, 'asd', 'ads', 'test', '2015-08-08 00:00:00', 'sdfg', NULL, 1);

-- --------------------------------------------------------

--
-- Table structure for table `jadwal`
--

CREATE TABLE IF NOT EXISTS `jadwal` (
  `id_jadwal` int(11) NOT NULL,
  `judul` varchar(25) NOT NULL,
  `deskripsi` text NOT NULL,
  `gambar` varchar(25) NOT NULL,
  `tanggal` datetime NOT NULL,
  `alamat` text NOT NULL,
  `koordinat` varchar(100) DEFAULT NULL,
  `durasi` int(10) NOT NULL,
  `status` int(1) NOT NULL
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8;

--
-- Dumping data for table `jadwal`
--

INSERT INTO `jadwal` (`id_jadwal`, `judul`, `deskripsi`, `gambar`, `tanggal`, `alamat`, `koordinat`, `durasi`, `status`) VALUES
(9, 'sdaf', 'asfd', 'test', '2015-09-04 00:00:00', 'asdf', NULL, 2, 1),
(10, 'sfd', 'asfd', 'test', '2015-09-03 00:00:00', 'esdfds', NULL, 2, 1);

-- --------------------------------------------------------

--
-- Table structure for table `kategori`
--

CREATE TABLE IF NOT EXISTS `kategori` (
  `id_kategori` int(3) NOT NULL,
  `kategori` varchar(25) NOT NULL,
  `deskripsi` text NOT NULL
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8;

--
-- Dumping data for table `kategori`
--

INSERT INTO `kategori` (`id_kategori`, `kategori`, `deskripsi`) VALUES
(1, 'Ramadhan', 'asd'),
(7, 'Lebaran', 'sad');

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE IF NOT EXISTS `user` (
  `id_user` int(11) NOT NULL,
  `username` varchar(11) NOT NULL,
  `password` varchar(11) NOT NULL,
  `status` int(11) NOT NULL
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`id_user`, `username`, `password`, `status`) VALUES
(1, 'admin', 'admin', 1);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `content`
--
ALTER TABLE `content`
  ADD PRIMARY KEY (`id_content`),
  ADD KEY `id_kategori` (`id_kategori`),
  ADD KEY `id_user` (`id_user`);

--
-- Indexes for table `event`
--
ALTER TABLE `event`
  ADD PRIMARY KEY (`id_event`);

--
-- Indexes for table `jadwal`
--
ALTER TABLE `jadwal`
  ADD PRIMARY KEY (`id_jadwal`);

--
-- Indexes for table `kategori`
--
ALTER TABLE `kategori`
  ADD PRIMARY KEY (`id_kategori`);

--
-- Indexes for table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`id_user`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `content`
--
ALTER TABLE `content`
  MODIFY `id_content` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=65;
--
-- AUTO_INCREMENT for table `event`
--
ALTER TABLE `event`
  MODIFY `id_event` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=13;
--
-- AUTO_INCREMENT for table `jadwal`
--
ALTER TABLE `jadwal`
  MODIFY `id_jadwal` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=11;
--
-- AUTO_INCREMENT for table `kategori`
--
ALTER TABLE `kategori`
  MODIFY `id_kategori` int(3) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=8;
--
-- AUTO_INCREMENT for table `user`
--
ALTER TABLE `user`
  MODIFY `id_user` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=2;
--
-- Constraints for dumped tables
--

--
-- Constraints for table `content`
--
ALTER TABLE `content`
  ADD CONSTRAINT `content_ibfk_1` FOREIGN KEY (`id_kategori`) REFERENCES `kategori` (`id_kategori`),
  ADD CONSTRAINT `content_ibfk_2` FOREIGN KEY (`id_user`) REFERENCES `user` (`id_user`);

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
