const express = require('express');
const addressValidator = require('../utils/addressValidator.js');
const {addSchool} = require('../controllers/addSchoolController.js');

const router = express.Router({
  strict: true,
});

router.route('/addSchool').post(addressValidator, addSchool);

module.exports = router;