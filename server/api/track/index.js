//api/track/index.js

'use strict';

var express = require('express');
var controller = require('./track.controller');

var router = express.Router();

//router.get('/:type/:pageSize/:page/:orderBy/:search', controller.index);
//router.get('/:type/:id', controller.show);
router.post('/', controller.create);
router.get('/', controller.index);
router.get('/stream/:id', controller.stream);
//router.post('/populate/:type', controller.populate);
//router.put('/:type/:id', controller.update);
//router.patch('/:type/:id', controller.update);
//router.delete('/:type/:id', controller.destroy);

module.exports = router;