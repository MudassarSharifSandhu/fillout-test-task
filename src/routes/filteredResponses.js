const express = require('express');
const router = express.Router();
const filteredResponsesController = require('../controllers/filteredResponses');

router.get('/:formId/filteredResponses', filteredResponsesController.getFilteredResponses);

module.exports = router;