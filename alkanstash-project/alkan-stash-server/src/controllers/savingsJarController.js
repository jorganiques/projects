const SavingsJar = require('../models/SavingsJar');

const handleError = (res, message, error, statusCode = 500) => {
  console.error(message, error);
  res.status(statusCode).json({ message, error });
};

const findJar = async (userId, jarId) => {
  return await SavingsJar.findOne({ userId, jarId, isDeleted: false });
};

// Function to create a savings jar
exports.createSavingsJar = async (req, res) => {
  try {
    const { jarName, targetAmount, userId, notes = '' } = req.body;

    if (!jarName || !targetAmount || !userId) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    const newJar = new SavingsJar({ jarName, targetAmount, userId, notes, isDeleted: false });

    await newJar.save();
    res.status(201).json({ message: 'Savings jar created successfully', jar: newJar });
  } catch (error) {
    handleError(res, 'Failed to create savings jar', error);
  }
};

// Function to get all jars by userId
exports.getJarsByUserId = async (req, res) => {
  const { userId } = req.params;

  try {
    const jars = await SavingsJar.find({ userId, isDeleted: false });
    res.status(200).json(jars);
  } catch (error) {
    handleError(res, 'Error retrieving jars', error);
  }
};

// Function to get a specific jar by userId and jarId
exports.getJarByUserAndJar = async (req, res) => {
  const { userId, jarId } = req.params;

  try {
    const jar = await findJar(userId, jarId);

    if (!jar) {
      return res.status(404).json({ message: 'Jar not found' });
    }

    res.status(200).json(jar);
  } catch (error) {
    handleError(res, 'Error retrieving jar', error);
  }
};

// Function to delete (mark as deleted) a jar
exports.deleteJar = async (req, res) => {
  const { userId, jarId } = req.params;

  try {
    const jar = await SavingsJar.findOneAndUpdate(
      { userId, jarId },
      { isDeleted: true },
      { new: true }
    );

    if (!jar) {
      return res.status(404).json({ message: 'Jar not found' });
    }

    res.status(200).json({ message: 'Jar marked as deleted', jar });
  } catch (error) {
    handleError(res, 'Failed to delete jar', error);
  }
};

// Function to update a jar's details
exports.updateJar = async (req, res) => {
  const { userId, jarId } = req.params;
  const { targetAmount, notes } = req.body;

  try {
    const updatedJar = await SavingsJar.findOneAndUpdate(
      { userId, jarId, isDeleted: false },
      { targetAmount, notes, lastUpdated: Date.now() },
      { new: true }
    );

    if (!updatedJar) {
      return res.status(404).json({ message: 'Jar not found or has been deleted' });
    }

    res.status(200).json({ message: 'Jar updated successfully', jar: updatedJar });
  } catch (error) {
    handleError(res, 'Failed to update jar', error);
  }
};
