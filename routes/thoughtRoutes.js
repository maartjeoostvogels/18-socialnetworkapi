const { Router } = require('express');
const { Thought, User } = require('../models');

const router = Router();

// Get list of all thoughts
router.get('/', async (req, res) => {
  const thoughts = await Thought.find({});
  res.json(thoughts);
});

// Get a single thought by id
router.get('/:id', async (req, res) => {
  const id = req.params.id;

  try {
    const thought = await Thought.findById(id).exec();

    if (thought) {
      return res.json(thought);
    } else {
      res.status(404).json('User not found');
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: 'Something went wrong' });
  }
});

// Create a thought
router.post('/', async (req, res) => {
  const { thoughtText, username } = req.body;

  try {
    const user = await User.findOne({ username }).exec();
    if (user) {
      const thought = new Thought({ thoughtText, username });
      await thought.save();
      await User.updateOne({ username }, { $addToSet: { thoughts: thought._id } }).exec();

      res.json(thought);
    } else {
      res.status(404).json('Username not found');
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: 'Something went wrong' });
  }
});

// Update a thought
router.put('/:id', async (req, res) => {
  const id = req.params.id;

  try {
    const thought = await Thought.findById(id);

    if (thought) {
      const { thoughtText, username } = req.body;
      thought.thoughtText = thoughtText;
      thought.username = username;
      await thought.save();

      res.json(thought);
    } else {
      res.status(404).json('User not found');
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: 'Something went wrong' });
  }
});

// Delete a thought
router.delete('/:id', async (req, res) => {
  const id = req.params.id;

  try {
    await Thought.findByIdAndDelete(id).exec();
    res.status(204).send();
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: 'Something went wrong' });
  }
});

// Create a reaction
router.post('/:thoughtId/reactions', async (req, res) => {
  const { thoughtId } = req.params;
  const { reactionBody, username } = req.body;

  try {
    const thought = await Thought.findByIdAndUpdate(
      thoughtId,
      { $push: { reactions: { reactionBody, username } } },
      { returnDocument: 'after' }
    ).exec();

    if (thought) {
      res.json(thought);
    } else {
      res.status(404).json('Thought not found');
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: 'Something went wrong' });
  }
});

router.delete('/:thoughtId/reactions', async (req, res) => {
  const { thoughtId } = req.params;
  const { reactionId } = req.body;

  try {
    const thought = await Thought.findByIdAndUpdate(
      thoughtId,
      { $pull: { reactions: { reactionId } } },
      { returnDocument: 'after' }
    ).exec();

    if (thought) {
      res.json(thought);
    } else {
      res.status(404).json('Thought not found');
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: 'Something went wrong' });
  }
});


module.exports = router;