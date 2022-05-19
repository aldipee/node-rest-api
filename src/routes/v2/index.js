const express = require('express');
const movieRoute = require('./movie.route');
const todoRoute = require('./todo.route');

const router = express.Router();

const defaultRoutes = [
  {
    path: '/movies',
    route: movieRoute,
  },
  {
    path: '/todos',
    route: todoRoute,
  },
];

defaultRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

module.exports = router;
