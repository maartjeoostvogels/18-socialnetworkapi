const { Schema, Types, model } = require('mongoose');

const reactionSchema = new Schema({
    reactionId: {
        type: Types.ObjectId,
        default: () => new Types.ObjectId(),
    },
    reactionBody: {
        type: String,
        required: true,
        maxlength: 280,
    },
    username: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
        get: date => Date.toLocaleString(date),
    },
});

const thoughtSchema = new Schema({
  thoughtText: {
    type: String,
    minlength: 1,
    maxlength: 280,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    get: date => Date.toLocaleString(date),
  },
  username: {
    type: String,
    required: true,
  },
  reactions: [reactionSchema],
});

const Thought = model('Thought', thoughtSchema);

module.exports = Thought;