const express = require('express');
const uuid = require('uuid');
const app = express();
const path = require('path');

const mongoose = require('mongoose');
mongoose.set('strictQuery', true);

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/socialmedia');
}

// TODO: Move this to models/user.js
const userSchema = new mongoose.Schema({
  username: String,
  email: String
});

const User = mongoose.model('User', userSchema);
// END TODO MOVE

main().catch(err => console.log(err));

const PORT = process.env.PORT || 3001;

app.use(express.json());

app.get('/', (req, res) =>
  res.json('hello world')
);

app.get('/api/users', (req, res) => {
  User.find({}, function (err, result) {
    if (err) {
      console.log(err);
    } else {
      res.json(result);
    }
  });
});

app.get('/api/users/:id', (req, res) => {
  const id = req.params.id;
  User.findById(id, function (err, result) {
    if (err) {
      console.log(err);
    } else {
      res.json(result);
    }
  });
})

app.post('/api/users', (req, res) => {
  const { username, email } = req.body;

  if (username && email) {
    const user = new User({ username, email });
    user.save();

    res.json(user)
  }

  res.json({
    error: 'error, please provide a username and email for the user'
  });
})

app.delete('/api/users/:id', (req, res) => {
  const id = req.params.id;
  User.findOneAndDelete(id, function (err, result) {
    if (err){
        console.log(err)
    }
    else{
        console.log("Deleted User : ", result);
        res.json("Deleted User " + result.username);
    };
  });
})

app.listen(PORT, () => console.log(`Listening on PORT: ${PORT}`));
