const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid'); 

const SavingsJarSchema = new mongoose.Schema({
  jarId: { type: String, default: uuidv4 }, 
  jarName: { type: String, required: true },
  targetAmount: { type: Number, required: true },
  isDeleted: { type: Boolean, default: false },
  userId: { type: String, required: true },  
  notes: { type: String, default: '' },
  createdAt: { type: Date, default: Date.now },
  lastUpdated: { type: Date, default: Date.now }
});

// Update lastUpdated field before saving
SavingsJarSchema.pre('save', function (next) {
  this.lastUpdated = Date.now();
  next();
});

module.exports = mongoose.model('SavingsJar', SavingsJarSchema, 'jars');
