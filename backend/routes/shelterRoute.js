const express = require('express');
const router = express.Router();
const {
  createShelter,
  getAllShelters,
  getShelterById,
  updateShelter,
  deleteShelter
} = require('../controllers/shelterController');

const { protect } = require('../middlewares/authMiddleware');
const { isAdmin } = require('../middlewares/isAdmin');

router.post('/', protect, isAdmin, createShelter);
router.get('/', getAllShelters);
router.get('/:id', getShelterById);
router.put('/:id', protect, isAdmin, updateShelter);
router.delete('/:id', protect, isAdmin, deleteShelter);

module.exports = router;
