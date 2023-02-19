const { Router } = require('express');
const {
  getUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser,
  addFriend,
  deleteFriend
} = require('../controllers/userController');

const router = Router();

// Get list of all users
router.get('/', getUsers);

// Get a single user by id
router.get('/:id', getUser);

// Create a user
router.post('/', createUser);

// Update a user
router.put('/:id', updateUser);

// Delete a user
router.delete('/:id', deleteUser);

// Add friend to friends list
router.post('/:id/friends/:friendId', addFriend);

// Delete friend from friends list
router.delete('/:id/friends/:friendId', deleteFriend);

module.exports = router;