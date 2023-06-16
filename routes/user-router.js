const express = require('express');
const router = express.Router();

const userController = require('../controllers/user-controller');

router.get('/get-all-users', userController.getAllUsers);
router.get('/get-user', userController.getUser);
router.post('/add-users', userController.addUser);
router.put('/edit-users/:id', userController.editUser);
router.delete('/delete-users/:id', userController.deleteUser);

module.exports = router;