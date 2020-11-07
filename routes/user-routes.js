const express = require("express");
var UserController = require("../controllers/user-controller");

const router = express.Router();

router.post('/user/register', UserController.save);

module.exports = router;