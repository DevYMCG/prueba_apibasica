const express = require('express');
const SchoolController = require('../controllers/school-controller');

const router = express.Router();

router.post('/school/register', SchoolController.save);
router.get('/schools', SchoolController.getSchools);
router.get('/school/:id', SchoolController.getSchool);

module.exports = router;