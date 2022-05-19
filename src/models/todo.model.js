const { mongoose } = require('../utils/redisClient');
const { toJSON, paginate } = require('./plugins');

const todoSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ['DONE', 'PENDING', 'ON_PROGRESS'],
      default: 'PENDING',
    },
  },
  {
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
  }
);

// add plugin that converts mongoose to json
todoSchema.plugin(toJSON);
todoSchema.plugin(paginate);

/**
 * @typedef User
 */
const Todo = mongoose.model('Todo', todoSchema);

module.exports = Todo;
