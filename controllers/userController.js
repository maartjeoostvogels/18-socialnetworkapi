const { User, Thought } = require('../models');

module.exports = {
  async getUsers(req, res) {
    const users = await User.find({});
    res.json(users);
  },
  async getUser(req, res) {
    const { userId } = req.params;

    try {
      const user = await User.findById(userId).exec();

      if (user) {
        return res.json(user);
      } else {
        res.status(404).json('User not found');
      }
    } catch (err) {
      console.log(err);
      res.status(500).json({ message: 'Something went wrong' });
    }
  },
  async createUser(req, res) {
    const { username, email } = req.body;

    try {
      const user = new User({ username, email });
      await user.save();

      res.json(user);
    } catch (err) {
      console.log(err);
      res.status(500).json({ message: 'Something went wrong' });
    }
  },
  async updateUser(req, res) {
    const { userId } = req.params;

    try {
      const user = await User.findById(userId);

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
  },
  async deleteUser(req, res) {
    const { userId } = req.params;

    try {
      const user = await User.findByIdAndDelete(userId).exec();
      if (user) {
        await Thought.deleteMany({ username: user.username });
        res.status(204).send();
      } else {
        res.status(404).json('User not found');
      }
    } catch (err) {
      console.log(err);
      res.status(500).json({ message: 'Something went wrong' });
    }
  },
  async addFriend(req, res) {
    const { userId, friendId } = req.params;

    try {
      await User.findByIdAndUpdate(userId, { $addToSet: { friends: friendId } });
      res.status(204).send();
    } catch (err) {
      console.log(err);
      res.status(500).json({ message: 'Something went wrong' });
    }
  },
  async deleteFriend(req, res) {
    const { userId, friendId } = req.params;

    try {
      await User.findByIdAndUpdate(userId, { $pull: { friends: friendId } });
      res.status(204).send();
    } catch (err) {
      console.log(err);
      res.status(500).json({ message: 'Something went wrong' });
    }
  }
};