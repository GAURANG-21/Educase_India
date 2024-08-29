const express = require('express');
const addressValidator = require('../utils/addressValidator.js');
const {addSchool, getAllSchool} = require('../controllers/addSchoolController.js');

const router = express.Router({
  strict: true,
});

router.route('/addSchool').post(addressValidator, addSchool);
router.route('/getAllSchools').get(getAllSchool);

module.exports = router;