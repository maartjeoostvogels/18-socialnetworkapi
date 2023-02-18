const express = require('express');
const db = require('./config/connection');
const { User } = require('./models');

const PORT = process.env.PORT || 3001;
const app = express();

app.use(express.json());

// Get list of all users
app.get('/api/users', async (req, res) => {
  const users = await User.find({});
  res.json(users);
});

// Get a single user by id
app.get('/api/users/:id', async (req, res) => {
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
app.post('/api/users', async (req, res) => {
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
app.put('/api/users/:id', async (req, res) => {
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
app.delete('/api/users/:id', async (req, res) => {
  const id = req.params.id;

  try {
    await User.findByIdAndDelete(id).exec();
    res.status(204).send();
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: 'Something went wrong' });
  }
});

db.once('open', () => {
  app.listen(PORT, () => console.log(`Listening on PORT: ${PORT}`));
});