const express = require('express');
const router = express.Router();
const whiteTagController = require('../controllers/whiteTagController');

// Create a new white tag
router.post('/', whiteTagController.createWhiteTag);

// Get all white tags
router.get('/', whiteTagController.getAllWhiteTags);