const { Router } = require('express');
const { User } = require('../models');

const router = Router();

// Get list of all users
router.get('/', async (req, res) => {
  const users = await User.find({});
  res.json(users);
});

// Get a single user by id
router.get('/:id', async (req, res) => {
  const id = req.params.id;

  try {
    const user = await User.findById(id).exec();

    if (user) {
      return res.json(user);
    } else {
      res.status(404).json('User not found');
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: 'Something went wrong' });
  }
});

// Create a user
router.post('/', async (req, res) => {
  const { username, email } = req.body;

  try {
    const user = new User({ username, email });
    await user.save();

    res.json(user);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: 'Something went wrong' });
  }
});

// Update a user
router.put('/:id', async (req, res) => {
  const id = req.params.id;

  try {
    const user = await User.findById(id);

    if (user) {
      const { username, email } = req.body;
      user.username = username;
      user.email = email;
      await user.save();

      res.json(user);
    } else {
      res.status(404).json('User not found');
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: 'Something went wrong' });
  }
});

// Delete a user
router.delete('/:id', async (req, res) => {
  const id = req.params.id;

  try {
    await User.findByIdAndDelete(id).exec();
    res.status(204).send();
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: 'Something went wrong' });
  }
});

// Add friend to friends list
router.post('/:id/friends/:friendId', async (req, res) => {
  const { id, friendId } = req.params;

  try {
    const user = await User.findByIdAndUpdate(id, { $addToSet: { friends: friendId } });
    res.status(204).send();
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: 'Something went wrong' });
  }
});

// Delete friend from friends list
router.delete('/:id/friends/:friendId', async (req, res) => {
  const { id, friendId } = req.params;

  try {
    const user = await User.findByIdAndUpdate(id, { $pull: { friends: friendId } });
    res.status(204).send();
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: 'Something went wrong' });
  }
});

module.exports = router;