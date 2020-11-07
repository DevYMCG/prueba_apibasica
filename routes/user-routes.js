const express = require("express");
var UserController = require("../controllers/user-controller");

const router = express.Router();

router.post('/user/register', UserController.save);
router.post('/login', UserController.login);
router.get('/users', UserController.getUsers);
router.get('/user/:id', UserController.getUser);

module.exports = router;