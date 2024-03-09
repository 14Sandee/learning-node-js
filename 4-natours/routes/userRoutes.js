const express = require('express');
const { getAllUsers, getUser, createUser, deleteUser, updateUser, updateMe, deleteMe, getMe, uploadUserPhoto } = require('../controllers/userController')
const { signup, login, forgotPassword, resetPassword, updatePassword, protect, restrictTo, logout } = require('../controllers/authController');

const router = express.Router();

router.post('/signup', signup);
router.post('/login', login);
router.get('/logout', logout)

router.post('/forgotPassword', forgotPassword);
router.patch('/resetPassword/:token', resetPassword);

// Protect all routes after this middleware
router.use(protect);
router.patch('/updateMyPassword', updatePassword);
router.get('/me', getMe, getUser);
router.patch('/updateMe', uploadUserPhoto, updateMe);
router.delete('/deleteMe', deleteMe);

// Restrict all routes after this middleware to admin only
router.use(restrictTo('admin'));
router.route('/').get(getAllUsers).post(createUser);
router.route('/:id').get(getUser).patch(updateUser).delete(deleteUser);

module.exports = router;