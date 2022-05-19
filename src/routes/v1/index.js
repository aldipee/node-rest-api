const express = require('express');
const authRoute = require('./auth.route');
const userRoute = require('./user.route');
const docsRoute = require('./docs.route');
const movieRoute = require('./movie.route');
const todoRoute = require('./todo.route');
const productRoute = require('./product.route');
const bookRoute = require('./book.route');
const peopleRoute = require('./people.route');
const quoteRoute = require('./quote.route');
const toolsRoute = require('./tools.route');
const streamingRoute = require('./streaming.route');
const config = require('../../config/config');

const router = express.Router();

const defaultRoutes = [
  {
    path: '/auth',
    route: authRoute,
  },
  {
    path: '/users',
    route: userRoute,
  },
  {
    path: '/movies',
    route: movieRoute,
  },
  {
    path: '/todos',
    route: todoRoute,
  },
  {
    path: '/products',
    route: productRoute,
  },
  {
    path: '/books',
    route: bookRoute,
  },
  {
    path: '/people',
    route: peopleRoute,
  },
  {
    path: '/quotes',
    route: quoteRoute,
  },
  {
    path: '/tools',
    route: toolsRoute,
  },
  {
    path: '/streamings',
    route: streamingRoute,
  },
];

const devRoutes = [
  // routes available only in development mode
  {
    path: '/docs',
    route: docsRoute,
  },
];

defaultRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

/* istanbul ignore next */
if (config.env === 'development') {
  devRoutes.forEach((route) => {
    router.use(route.path, route.route);
  });
}

module.exports = router;
