const Animal = require('../models/Animal');

// POST /api/animals
exports.reportAnimal = async (req, res) => {
  try {
    const animalData = {
      ...req.body,
      reportedBy: req.user.id,
    };

    const animal = new Animal(animalData);
    const saved = await animal.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// GET /api/animals/:id
exports.getAnimalById = async (req, res) => {
  try {
    const animal = await Animal.findById(req.params.id).populate('reportedBy', 'name email');
    if (!animal) return res.status(404).json({ message: 'Animal not found' });

    res.status(200).json(animal);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// GET /api/animals
exports.getAllAnimals = async (req, res) => {
  try {
    const animals = await Animal.find().populate('reportedBy', 'name email');
    res.json(animals);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// PUT /api/animals/:id
exports.updateAnimal = async (req, res) => {
  try {
    const animal = await Animal.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!animal) return res.status(404).json({ message: 'Animal not found' });

    res.status(200).json(animal);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

// DELETE /api/animals/:id
exports.deleteAnimal = async (req, res) => {
  try {
    const animal = await Animal.findByIdAndDelete(req.params.id);

    if (!animal) return res.status(404).json({ message: 'Animal not found' });

    res.status(200).json({ message: 'Animal deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};
