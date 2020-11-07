const express = require('express');
const ParentController = require('../controllers/parent-controller');

const router = express.Router();
var md_auth = require('../middlewares/authenticate');

router.post('/parent/register', ParentController.save);
router.post('/parent/login', ParentController.login);
router.get('/parent/:id', ParentController.getParent);
router.get('/parents', ParentController.getParents);

module.exports = router;