const WhiteTag = require('../models/WhiteTag');

// Create a new white tag
exports.createWhiteTag = async (req, res) => {
    try {
        const newWhiteTag = new WhiteTag(req.body);
        await newWhiteTag.save();
        res.status(201).json(newWhiteTag);
    } catch (error) {
        res.status(500).json({ message: 'Error creating white tag', error });
    }
}

// Get all white tags
exports.getAllWhiteTags = async (req, res) => {
    try {
        const whiteTags = await WhiteTag.find();
        res.status(200).json(whiteTags);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching white tags', error });
    }
}