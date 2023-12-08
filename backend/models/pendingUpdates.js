const mongoose = require('mongoose');

const pendingUpdatesSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'members', 
  },
  restaurantId: {
    type: Number,
    ref: 'RestCard2', 
  },
  action: {
    type: String,
    enum: ['add', 'update', 'delete'],
  },
  restaurantData: {
    type: mongoose.Schema.Types.Mixed,
  },
  reason: {
    type: String,
  },
  status: {
    type: String,
    default: 'pending',
  },
});

PendingUpdates = mongoose.model('pending', pendingUpdatesSchema, 'pending');

module.exports = PendingUpdates;
