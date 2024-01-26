const express = require('express');
const { registerUser, loginUser, deleteUser, findAllUsers, findUserById, updateUser } = require('../controllers/user.controller');

const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.delete('/:id', deleteUser);
router.get('/users', findAllUsers);
router.get('/:id', findUserById);
router.patch('/:id', updateUser);

module.exports = router;