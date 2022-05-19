const Joi = require('joi');
const { objectId } = require('./custom.validation');

const createTodo = {
  body: Joi.object().keys({
    title: Joi.string().required(),
    description: Joi.string().required(),
    status: Joi.string().required().valid('DONE', 'PENDING', 'ON_PROGRESS'),
  }),
};

const getTodoItems = {
  query: Joi.object().keys({
    name: Joi.string(),
    role: Joi.string(),
    sortBy: Joi.string(),
    limit: Joi.number().integer(),
    page: Joi.number().integer(),
  }),
};

const getTodoById = {
  params: Joi.object().keys({
    todoId: Joi.string().custom(objectId),
  }),
};

const updateTodoItem = {
  params: Joi.object().keys({
    todoId: Joi.required().custom(objectId),
  }),
  body: Joi.object()
    .keys({
      title: Joi.string(),
      description: Joi.string(),
      status: Joi.string().valid('DONE', 'PENDING', 'ON_PROGRESS'),
    })
    .min(1),
};

const deleteTodoItem = {
  params: Joi.object().keys({
    todoId: Joi.string().custom(objectId),
  }),
};

module.exports = {
  createTodo,
  getTodoItems,
  getTodoById,
  updateTodoItem,
  deleteTodoItem,
};
