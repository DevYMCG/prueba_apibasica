const express = require("express");
var LevelController = require("../controllers/level-controller");

const router = express.Router();

router.post('/level/register', LevelController.save);

module.exports = router;