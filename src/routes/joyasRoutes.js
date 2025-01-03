const express = require('express');
const router = express.Router();
const { getJoyas, getJoyasFiltradas } = require('../controllers/joyasController.js');

router.get('/joyas', getJoyas);
router.get('/joyas/filtros', getJoyasFiltradas);

module.exports = router;
