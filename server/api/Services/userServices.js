const User = require('../Model/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.createUser = async (userData) => {
  userData.password = await bcrypt.hash(userData.password,  10);
  const user = new User(userData);
  return await user.save();
};

exports.authenticateUser = async (credentials) => {
  const user = await User.findOne({ email: credentials.email });
  if (user && await bcrypt.compare(credentials.password, user.password)) {
    const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1D' });
    return { token, userId: user._id, role:user.role, useremail:user.email, uname:user.name };
  }
  throw new Error('Authentication failed.');
};

exports.getUserById = async (userId) => {
  return await User.findById(userId);
};

exports.updateUser = async (userId, updateData) => {
  return await User.findByIdAndUpdate(userId, updateData, { new: true });
};

exports.deleteUser = async (userId) => {
  return await User.findByIdAndDelete(userId);
};
