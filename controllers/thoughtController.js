const { Thought, User } = require('../models');

module.exports = {
  async getThoughts(req, res) {
    const thoughts = await Thought.find({});
    res.json(thoughts);
  },
  async getThought(req, res) {
    const { thoughtId } = req.params;

    try {
      const thought = await Thought.findById(thoughtId).exec();

      if (thought) {
        return res.json(thought);
      } else {
        res.status(404).json('User not found');
      }
    } catch (err) {
      console.log(err);
      res.status(500).json({ message: 'Something went wrong' });
    }
  },
  async createThought(req, res) {
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
  },
  async updateThought(req, res) {
    const { thoughtId } = req.params;

    try {
      const thought = await Thought.findById(thoughtId);

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
  },
  async deleteThought(req, res) {
    const { thoughtId } = req.params;

    try {
      await Thought.findByIdAndDelete(thoughtId).exec();
      res.status(204).send();
    } catch (err) {
      console.log(err);
      res.status(500).json({ message: 'Something went wrong' });
    }
  },
  async addReaction(req, res) {
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
  },
  async deleteReaction(req, res) {
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
  }
};
