const express = require('express');
const { registerUser, loginUser, getCurrentUser, logoutUser, addUserAddress, getAllUser, getUserById, updateMe, deleteUser } = require('../controllers/userController');
const { userAuth, isAdmin } = require('../middlewares/auth');

const router = express.Router();


router.route('/register').post(registerUser)
router.route('/login').post(loginUser)
router.route('/logout').get(logoutUser)
router.route('/addAddress').post(userAuth,addUserAddress)
router.route('/me').get(userAuth,getCurrentUser).patch(userAuth,updateMe)

// admin route
router.route('/all').get(userAuth,isAdmin,getAllUser)
router.route('/:id').get(userAuth,isAdmin,getUserById).delete(userAuth,isAdmin,deleteUser)

module.exports = router