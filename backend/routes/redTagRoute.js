const express = require('express');
const router = express.Router();
const redTagController = require('../controllers/redTagController');

// Create a new red tag
router.post('/', redTagController.createRedTag);

// Get all red tags
router.get('/', redTagController.getAllRedTags);

// Get a red tag by ID
router.get('/:id', redTagController.getRedTagById);

// Update a red tag by ID
router.put('/:id', redTagController.updateRedTag);