const express = require('express');
const router = express.Router();
const { reportAnimal, getAllAnimals, getAnimalById, updateAnimal, deleteAnimal } = require('../controllers/animalController');
const { protect } = require('../middlewares/authMiddleware');
router.post('/', protect, reportAnimal);
router.get('/:id', getAnimalById);
router.get('/', getAllAnimals);
router.put('/:id', updateAnimal);
router.delete('/:id', deleteAnimal);

module.exports = router;