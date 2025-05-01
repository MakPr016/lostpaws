const Shelter = require('../models/Shelter');

// POST /api/shelters
exports.createShelter = async (req, res) => {
  try {
    const shelter = new Shelter(req.body);
    const savedShelter = await shelter.save();
    res.status(201).json(savedShelter);
  } catch (error) {
    res.status(500).json({ message: 'Error creating shelter', error });
  }
};

// GET /api/shelters
exports.getAllShelters = async (req, res) => {
  try {
    const shelters = await Shelter.find();
    res.status(200).json(shelters);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching shelters', error });
  }
};

// GET /api/shelters/:id
exports.getShelterById = async (req, res) => {
  try {
    const shelter = await Shelter.findById(req.params.id);
    if (!shelter) return res.status(404).json({ message: 'Shelter not found' });

    res.status(200).json(shelter);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching shelter', error });
  }
};

// PUT /api/shelters/:id
exports.updateShelter = async (req, res) => {
  try {
    const shelter = await Shelter.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });
    if (!shelter) return res.status(404).json({ message: 'Shelter not found' });

    res.status(200).json(shelter);
  } catch (error) {
    res.status(500).json({ message: 'Error updating shelter', error });
  }
};

// DELETE /api/shelters/:id
exports.deleteShelter = async (req, res) => {
  try {
    const shelter = await Shelter.findByIdAndDelete(req.params.id);
    if (!shelter) return res.status(404).json({ message: 'Shelter not found' });

    res.status(200).json({ message: 'Shelter deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting shelter', error });
  }
};
