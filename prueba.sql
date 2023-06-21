-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 21-06-2023 a las 19:30:21
-- Versión del servidor: 10.4.27-MariaDB
-- Versión de PHP: 7.4.33

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `prueba`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `doc_documento`
--

CREATE TABLE `doc_documento` (
  `DOC_ID` int(11) NOT NULL,
  `DOC_NOMBRE` varchar(60) NOT NULL,
  `DOC_CODIGO` varchar(50) NOT NULL,
  `DOC_CONTENIDO` varchar(4000) NOT NULL,
  `DOC_ID_TIPO` int(11) NOT NULL,
  `DOC_ID_PROCESO` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

--
-- Volcado de datos para la tabla `doc_documento`
--

INSERT INTO `doc_documento` (`DOC_ID`, `DOC_NOMBRE`, `DOC_CODIGO`, `DOC_CONTENIDO`, `DOC_ID_TIPO`, `DOC_ID_PROCESO`) VALUES
(1, 'INSTRUCTIVO DE DESARROLLO', 'INS-ING-1', 'texto grande con el contenido del documento', 1, 1),
(2, 'Estadisticas', 'MSTAT-LA-2', 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s', 4, 2),
(3, 'Consultor', 'MSN-IC-3', 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s', 5, 4),
(4, 'Instructivo contador', 'INS-CP-4', 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s', 1, 5),
(5, 'Quimicio', 'MSTAT-IQ-5', 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s', 4, 3);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `pro_proceso`
--

CREATE TABLE `pro_proceso` (
  `PRO_ID` int(11) NOT NULL,
  `PRO_PREFIJO` varchar(20) NOT NULL,
  `PRO_NOMBRE` varchar(60) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

--
-- Volcado de datos para la tabla `pro_proceso`
--

INSERT INTO `pro_proceso` (`PRO_ID`, `PRO_PREFIJO`, `PRO_NOMBRE`) VALUES
(1, 'ING', 'Ingeniería'),
(2, 'LA', 'Licenciatura en Administración'),
(3, 'IQ', 'Ingeniería Química'),
(4, 'IC', 'Ingeniería Civil'),
(5, 'CP', 'Contador Público');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tbl_users`
--

CREATE TABLE `tbl_users` (
  `user_id` int(11) NOT NULL,
  `user_user` varchar(50) NOT NULL,
  `user_password` varchar(100) NOT NULL,
  `user_estado` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

--
-- Volcado de datos para la tabla `tbl_users`
--

INSERT INTO `tbl_users` (`user_id`, `user_user`, `user_password`, `user_estado`) VALUES
(1, 'master', '$2b$10$fWxYC9jXFFRTicLoGg7bXetEOhua7DrHiDeY.DVAYwbdIUhvwWplK', 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tic_tipo_doc`
--

CREATE TABLE `tic_tipo_doc` (
  `TIP_ID` int(11) NOT NULL,
  `TIP_NOMBRE` varchar(60) NOT NULL,
  `TIP_PREFIJO` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

--
-- Volcado de datos para la tabla `tic_tipo_doc`
--

INSERT INTO `tic_tipo_doc` (`TIP_ID`, `TIP_NOMBRE`, `TIP_PREFIJO`) VALUES
(1, 'Instructivo', 'INS'),
(2, 'Maestría en Psicología', 'MP'),
(3, 'Doctor/a en psicología', 'PsyD'),
(4, 'Master en estadística', 'MSTAT'),
(5, 'Nivel de máster', 'MSN');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `doc_documento`
--
ALTER TABLE `doc_documento`
  ADD PRIMARY KEY (`DOC_ID`);

--
-- Indices de la tabla `pro_proceso`
--
ALTER TABLE `pro_proceso`
  ADD PRIMARY KEY (`PRO_ID`);

--
-- Indices de la tabla `tbl_users`
--
ALTER TABLE `tbl_users`
  ADD PRIMARY KEY (`user_id`);

--
-- Indices de la tabla `tic_tipo_doc`
--
ALTER TABLE `tic_tipo_doc`
  ADD PRIMARY KEY (`TIP_ID`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `doc_documento`
--
ALTER TABLE `doc_documento`
  MODIFY `DOC_ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT de la tabla `pro_proceso`
--
ALTER TABLE `pro_proceso`
  MODIFY `PRO_ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT de la tabla `tbl_users`
--
ALTER TABLE `tbl_users`
  MODIFY `user_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT de la tabla `tic_tipo_doc`
--
ALTER TABLE `tic_tipo_doc`
  MODIFY `TIP_ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
