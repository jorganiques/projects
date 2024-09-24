const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid'); 

const transactionSchema = new mongoose.Schema({
  transactionId: { type: String, default: uuidv4 }, 
  userId: { type: String, required: true }, 
  jarId: { type: String, required: true }, 
  createdAt: { type: Date, default: Date.now },
  transactionType: { type: String, enum: ['Deposit', 'Withdrawal'], required: true },
  amount: { type: Number, required: true },
  isDeleted: { type: Boolean, default: false }
});

const Transaction = mongoose.model('Transaction', transactionSchema);

module.exports = Transaction;
