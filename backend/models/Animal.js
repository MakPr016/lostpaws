const mongoose = require('mongoose');

const animalSchema = new mongoose.Schema({
  name: String,
  type: String,
  description: String,
  imageUrl: String,
  location: {
    type: {
      type: String,
      enum: ['Point'],
      default: 'Point',
    },
    coordinates: [Number], // [longitude, latitude]
  },
  reportedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  status: {
    type: String,
    enum: ['Reported', 'Adopted', 'Resolved'],
    default: 'Reported',
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

animalSchema.index({ location: '2dsphere' });

module.exports = mongoose.model('Animal', animalSchema);
