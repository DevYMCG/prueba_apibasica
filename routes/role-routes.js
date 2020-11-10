const express = require('express');
const RoleController = require('../controllers/role-controller');

const router = express.Router();

router.post('/role/register', RoleController.save);
router.get('/roles', RoleController.getRoles);
router.get('/role/:id', RoleController.getRole);
router.delete('/role/:id', RoleController.delete);

module.exports = router;