const userService = require('../Services/userServices');
const jwt = require('jsonwebtoken');

exports.registerUser = async (req, res) => {
  const { name, email, password, role } = req.body;
  try {
    if( name=="" || email == "" || password=="" ){
      throw new Error( "Please fill all the fields");
    }


    const newUser = await userService.createUser({ name, email, password, role });
    res.status(201).json({ message: 'User registered successfully.' });
  } catch (error) {
    if (error.message.includes('duplicate key error')) {
      // Customize the error message for duplicate email or name
      if (error.message.includes('email')) {
        res.status(400).json({ message: 'Email already exists. Please use a different email address.' });
      } else if (error.message.includes('name')) {
        res.status(400).json({ message: 'Name already exists. Please use a different name.' });
      } else {
        // Generic error message for other issues
        res.status(500).json({ message: error.message || 'An error occurred.' });
      }
    } else {
      // Handle other errors
      res.status(500).json({ message: error.message || 'An error occurred.' });
    }
  }
};

exports.loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const { token, userId,role,useremail,uname } = await userService.authenticateUser({ email, password });
    res.json({ token, userId,role,useremail, uname });
    console.log(token, userId,role,useremail, uname);
  } catch (error) {
   res.status(500).json({ message: 'Invalid username or password' });
   console.log(error);
  }
};

exports.logoutUser = (req, res) => {
  // Clear the cookie or session token
  // This is just a placeholder and the actual implementation depends on how you handle sessions or tokens
  res.clearCookie('token');
  res.json({ message: 'Logged out successfully.' });
  console.log('Logged out successfully.');
};

exports.getUserProfile = async (req, res) => {
  // Assuming the user ID is attached to the request object after authentication
  const userId = req.user._id;
   
  // Fetch the user profile from the database
  const user = await userService.getUserById(userId);
   
  // Send the user profile
  res.json(user);
};

exports.updateUserProfile = async (req, res) => {
  // Assuming the user ID is attached to the request object after authentication
  const userId = req.user.id;
   
  // Extract the fields to update from the request body
  const updateFields = req.body;
   
  // Update the user profile in the database
  const updatedUser = await User.findByIdAndUpdate(userId, updateFields, { new: true });
   
  // Send the updated user profile
  res.json(updatedUser);
};
