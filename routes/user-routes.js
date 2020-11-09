const express = require("express");
var UserController = require("../controllers/user-controller");

const router = express.Router();
var md_auth = require('../middlewares/authenticate'); 

router.post('/user/register', UserController.save);
router.post('/login', UserController.login);
router.put('/update', md_auth.authenticate,UserController.update);
router.get('/users', UserController.getUsers);
router.get('/user/:id', UserController.getUser);
router.post('/upload-avatar', UserController.uploadAvatar);

module.exports = router;