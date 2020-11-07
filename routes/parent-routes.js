const express = require('express');
const ParentController = require('../controllers/parent-controller');

const router = express.Router();

router.post('/parent/register', ParentController.save);
router.get('/parent/:id', ParentController.getParent);
router.get('/parents', ParentController.getParents);

module.exports = router;