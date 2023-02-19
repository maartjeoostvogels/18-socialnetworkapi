const { User } = require('../models');

module.exports = {
  async getUsers(req, res) {
    const users = await User.find({});
    res.json(users);
  },
  async getUser(req, res) {
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
  },
  async deleteUser(req, res) {
    const id = req.params.id;

    try {
      await User.findByIdAndDelete(id).exec();
      res.status(204).send();
    } catch (err) {
      console.log(err);
      res.status(500).json({ message: 'Something went wrong' });
    }
  },
  async addFriend(req, res) {
    const { id, friendId } = req.params;

    try {
      const user = await User.findByIdAndUpdate(id, { $addToSet: { friends: friendId } });
      res.status(204).send();
    } catch (err) {
      console.log(err);
      res.status(500).json({ message: 'Something went wrong' });
    }
  },
  async deleteFriend(req, res) {
    const { id, friendId } = req.params;

    try {
      const user = await User.findByIdAndUpdate(id, { $pull: { friends: friendId } });
      res.status(204).send();
    } catch (err) {
      console.log(err);
      res.status(500).json({ message: 'Something went wrong' });
    }
  }
};