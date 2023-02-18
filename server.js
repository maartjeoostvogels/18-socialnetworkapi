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
  const user = await User.findById(id).exec();
  if (!user) {
    res.status(404).json('User not found');
  }
  else {
    res.json(user);
  }
})

// Create a user
app.post('/api/users', (req, res) => {
  const { username, email } = req.body;

  if (username && email) {
    const user = new User({ username, email });
    user.save();

    res.json(user);
  } else {
    res.json({
      error: 'error, please provide a username and email for the user'
    });
  }
});

// Update a user
app.put('/api/users/:id', async (req, res) => {
  const id = req.params.id;
  const user = await User.findById(id);
  if (!user) {
    res.status(404).json('User not found');
  }
  else {
    user.username = req.body.username;
    user.email = req.body.email;
    await user.save();
    res.json(user);
  }
});

// Delete a user
app.delete('/api/users/:id', async (req, res) => {
  const id = req.params.id;
  await User.findOneAndDelete(id).exec();
  res.status(204).send();
})

db.once('open', () => {
  app.listen(PORT, () => console.log(`Listening on PORT: ${PORT}`));
});