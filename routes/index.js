const routes = require('express').Router();
const controllers = require("../controllers/lesson1"); 

routes.get('/',controllers.karliRoute);
routes.get('/bane',controllers.baneRoute);

module.exports = routes;