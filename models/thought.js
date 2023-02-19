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
        get: date => date.toLocaleString(),
    },
},
{
  toJSON: {
    getters: true,
  }
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
    get: date => date.toLocaleString()
  },
  username: {
    type: String,
    required: true,
  },
  reactions: [reactionSchema],
},
{
  toJSON: {
    getters: true,
    virtuals: true
  }
});

thoughtSchema.virtual('reactionCount')
  .get(function () {
    return this.reactions.length;
  });

const Thought = model('Thought', thoughtSchema);

module.exports = Thought;