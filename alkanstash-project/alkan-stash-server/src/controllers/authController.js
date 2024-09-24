const User = require('../models/User');
const bcrypt = require('bcryptjs');

const handleError = (res, message, error, statusCode = 500) => {
  console.error(message, error);
  res.status(statusCode).json({ message, error });
};

const saveUser = async (user, res) => {
  try {
    await user.save();
    console.log('User saved successfully');
  } catch (error) {
    return handleError(res, 'Error saving user', error);
  }
};

// Register route
exports.register = async (req, res) => {
  const { username, email, password, firstName, lastName } = req.body;

  try {
    // Check if the user already exists
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Create a new user with auto-generated userId
    const user = new User({ username, email, password, firstName, lastName });

    console.log('User object before saving:', user);
    await saveUser(user, res); 

    res.status(201).json({ message: 'User registered successfully', userId: user.userId });
  } catch (error) {
    handleError(res, 'Error registering user', error);
  }
};

// Login route
exports.login = async (req, res) => {
  const { username, password } = req.body;

  try {
    // Find user by username
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(400).json({ message: 'User not found' });
    }

    // Compare password with the hashed password in the database
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Update lastLogin field
    user.lastLogin = new Date();
    console.log('Updating lastLogin:', user.lastLogin);
    await saveUser(user, res); 

    res.status(200).json({ message: 'Login successful' });
  } catch (error) {
    handleError(res, 'Error logging in', error);
  }
};

// Get user by username
exports.getUserByUsername = async (req, res) => {
  const { username } = req.params;

  try {
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const { password, ...userDetails } = user.toObject();
    res.status(200).json(userDetails);
  } catch (error) {
    handleError(res, 'Error fetching user', error);
  }
};
