const express = require('express');
const router = express.Router();
const userController = require('../Controller/userController');
const authMiddleware = require('../middleware/authCheckmiddleware');
const roleCheckMiddleware = require('../middleware/roleCheckMiddleware');

router.post('/register', userController.registerUser);
router.post('/login', userController.loginUser);
router.get('/profile', authMiddleware, userController.getUserProfile);
router.put('/profile', authMiddleware, userController.updateUserProfile);
router.post('/logout', authMiddleware, userController.logoutUser);

// Restricted route example
router.get('/admin', authMiddleware, roleCheckMiddleware('admin'), (req, res) => {
  res.send('Admin-only content.');
});

module.exports = router;
