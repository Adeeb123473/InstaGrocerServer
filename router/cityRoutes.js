const express = require('express');
const cityController = require('../controller/cityController');

const router = express.Router();

router.post('/', cityController.createCity);
router.get('/', cityController.getAllCities);
router.get('/:city_id', cityController.getCityById);
router.put('/:city_id', cityController.updateCity);
router.delete('/:city_id', cityController.deleteCity);

module.exports = router;