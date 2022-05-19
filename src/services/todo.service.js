const httpStatus = require('http-status');
const { clearKey } = require('../utils/redisClient');
const { Todo } = require('../models');
const ApiError = require('../utils/ApiError');

const createTodo = async (todoData) => {
  clearKey(Todo.collection.collectionName);
  return Todo.create(todoData);
};

const queryTodoItems = async (filter, options) => {
  const todoItems = await Todo.paginate(filter, { ...options, sortBy: 'created_at:desc' }, '-description -updated_at', true);
  return todoItems;
};

const getTodoItemById = async (id) => {
  return Todo.findById(id).cache();
};

const updateTodoItemById = async (todoId, updateBody) => {
  const item = await getTodoItemById(todoId);
  if (!item) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Item not found');
  }

  Object.assign(item, updateBody);
  await item.save();
  clearKey(Todo.collection.collectionName);
  return item;
};

const deleteTodoItemById = async (todoId) => {
  const item = await getTodoItemById(todoId);
  if (!item) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Item not found');
  }
  await item.remove();
  clearKey(Todo.collection.collectionName);
  return item;
};

module.exports = {
  createTodo,
  queryTodoItems,
  getTodoItemById,
  updateTodoItemById,
  deleteTodoItemById,
};
