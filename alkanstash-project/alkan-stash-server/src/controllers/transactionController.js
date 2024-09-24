const Transaction = require('../models/Transaction');

const handleError = (res, message, error, statusCode = 500) => {
  console.error(message, error);
  res.status(statusCode).json({ message, error });
};

const findTransactions = async (userId, jarId, isDeleted = false) => {
  return await Transaction.find({ userId, jarId, isDeleted });
};

// Function to create a transaction
exports.createTransaction = async (req, res) => {
  try {
    const { userId, jarId, transactionType, amount } = req.body;

    if (!userId || !jarId || !transactionType || !amount) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    const newTransaction = new Transaction({
      userId,
      jarId,
      transactionType,
      amount,
      isDeleted: false
    });

    await newTransaction.save();
    res.status(201).json({ message: 'Transaction created successfully', transaction: newTransaction });
  } catch (error) {
    handleError(res, 'Failed to create transaction', error);
  }
};

// Function to get transactions by userId and jarId
exports.getTransactionsByUserAndJar = async (req, res) => {
  const { userId, jarId } = req.params;

  try {
    const transactions = await findTransactions(userId, jarId);
    res.status(200).json(transactions);
  } catch (error) {
    handleError(res, 'Error retrieving transactions', error);
  }
};

// Function to delete (mark as deleted) all transactions by userId and jarId
exports.deleteTransaction = async (req, res) => {
  const { userId, jarId } = req.params;

  try {
    const result = await Transaction.updateMany(
      { userId, jarId, isDeleted: false },
      { isDeleted: true }
    );

    if (result.matchedCount === 0) {
      return res.status(404).json({ message: 'No transactions found or already deleted' });
    }

    res.status(200).json({ message: `${result.modifiedCount} transactions marked as deleted` });
  } catch (error) {
    handleError(res, 'Failed to delete transactions', error);
  }
};
