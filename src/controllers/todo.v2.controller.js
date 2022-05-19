const httpStatus = require('http-status');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const { buildResponse } = require('../utils/ApiResponse');
const catchAsync = require('../utils/catchAsync');
const { todoService } = require('../services');

const createTodoItem = catchAsync(async (req, res) => {
  const user = await todoService.createTodo(req.body);
  res.status(httpStatus.CREATED).send(buildResponse({ data: user, message: 'Successfully created new item' }));
});

const getTodoItems = catchAsync(async (req, res) => {
  const filter = pick(req.query, ['name', 'role']);
  const options = pick(req.query, ['sortBy', 'limit', 'page']);
  const result = await todoService.queryTodoItems(filter, options);
  res.send(buildResponse({ data: result, message: 'Successfully retrieved items' }));
});

const getTodoItemById = catchAsync(async (req, res) => {
  const item = await todoService.getTodoItemById(req.params.todoId);
  if (!item) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Data not found');
  }
  res.send(buildResponse({ data: item, message: 'Successfully retrieved item' }));
});

const updateTodoItemById = catchAsync(async (req, res) => {
  const user = await todoService.updateTodoItemById(req.params.todoId, req.body);
  res.send(buildResponse({ data: user, message: 'Successfully updated item' }));
});

const deleteTodoItem = catchAsync(async (req, res) => {
  await todoService.deleteTodoItemById(req.params.todoId);
  res.send(buildResponse({ message: 'Successfully deleted item', data: null }));
});

module.exports = {
  createTodoItem,
  getTodoItems,
  getTodoItemById,
  updateTodoItemById,
  deleteTodoItem,
};
