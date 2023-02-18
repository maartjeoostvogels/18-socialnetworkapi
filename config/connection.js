const mongoose = require('mongoose');

// Suppress deprecation warning
mongoose.set('strictQuery', false);

// Wrap Mongoose around local connection to MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/socialmedia', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

// Export connection
module.exports = mongoose.connection;