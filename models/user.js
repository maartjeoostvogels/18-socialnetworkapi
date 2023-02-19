const { Schema, model } = require('mongoose');

const userSchema = new Schema({
  username: {
    type: String,
    unique: true,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    validate: {
      validator: function (v) {
        return /^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/.test(v);
      },
      message: props => `${props.value} is not a valid e-mail!`
    },
    required: [true, 'User e-mail required'],
    unique: true
  },
  friends: [
    {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
  ],
  thoughts: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Thought'
    },
  ],
});

const User = model('User', userSchema);

module.exports = User;