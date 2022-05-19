const express = require('express');
const validate = require('../../middlewares/validate');
const todoValidation = require('../../validations/todo.validation');
const todoController = require('../../controllers/todo.v2.controller');

const router = express.Router();

router.route('/').post(validate(todoValidation.createTodo), todoController.createTodoItem).get(todoController.getTodoItems);

router
  .route('/:todoId')
  .get(validate(todoValidation.getTodoById), todoController.getTodoItemById)
  .patch(validate(todoValidation.updateTodoItem), todoController.updateTodoItemById)
  .delete(validate(todoValidation.deleteTodoItem), todoController.deleteTodoItem);

module.exports = router;
