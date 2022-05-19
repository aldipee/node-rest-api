const httpStatus = require('http-status');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { todoService } = require('../services');

const createTodoItem = catchAsync(async (req, res) => {
  const user = await todoService.createTodo(req.body);
  res.status(httpStatus.CREATED).send(user);
});

const getTodoItems = catchAsync(async (req, res) => {
  const filter = pick(req.query, ['name', 'role']);
  const options = pick(req.query, ['sortBy', 'limit', 'page']);
  const result = await todoService.queryTodoItems(filter, options);
  res.send(result);
});

const getTodoItemById = catchAsync(async (req, res) => {
  const item = await todoService.getTodoItemById(req.params.todoId);
  if (!item) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Data not found');
  }
  res.send(item);
});

const updateTodoItemById = catchAsync(async (req, res) => {
  const user = await todoService.updateTodoItemById(req.params.todoId, req.body);
  res.send(user);
});

const deleteTodoItem = catchAsync(async (req, res) => {
  await todoService.deleteTodoItemById(req.params.todoId);
  res.status(httpStatus.NO_CONTENT).send();
});

module.exports = {
  createTodoItem,
  getTodoItems,
  getTodoItemById,
  updateTodoItemById,
  deleteTodoItem,
};
