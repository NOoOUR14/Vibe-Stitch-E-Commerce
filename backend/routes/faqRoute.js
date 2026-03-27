const express = require('express');
const faqController = require('../controllers/faqController');
const authController = require('../controllers/authController'); 

const router = express.Router();

router
  .route.route('/')
  .get(faqController.getAllFAQs) 
  .post(faqController.createFAQ); 

router
  .route('/:id')
  .delete(authController.protect, authController.restrictTo('admin'), faqController.deleteFAQ); 

module.exports = router;