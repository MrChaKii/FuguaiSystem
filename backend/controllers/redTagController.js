const RedTag = require('../models/RedTag');
const nodemailer = require('nodemailer');

// Create a new red tag
exports.createRedTag = async (req, res) => {
    try {
        const newRedTag = new RedTag(req.body);
        await newRedTag.save();
        //send mail to Admin
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS
            }
        });
        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: 'alwickramasooriya@gmail.com',
            subject: 'New Red Tag Created',
            text: `A new red tag has been created:\n\n${JSON.stringify(newRedTag, null, 2)}`
        };
        await transporter.sendMail(mailOptions);
        res.status(201).json(newRedTag);
    } catch (error) {
        res.status(500).json({ message: 'Error creating red tag', error });
    }
}

    //get all red tags
exports.getAllRedTags = async (req, res) => {
    try {
        const redTags = await RedTag.find();
        res.status(200).json(redTags);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching red tags', error });
    }
}

// Get a red tag by ID
exports.getRedTagById = async (req, res) => {
    try {
        const redTag = await RedTag.findById(req.params.id);
        if (!redTag) {
            return res.status(404).json({ message: 'Red tag not found' });
        }
        res.status(200).json(redTag);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching red tag', error });
    }
}

// Update a red tag by ID
exports.updateRedTag = async (req, res) => {
    try {
        const updatedRedTag = await RedTag.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedRedTag) {
            return res.status(404).json({ message: 'Red tag not found' });
        }
        res.status(200).json(updatedRedTag);
    } catch (error) {
        res.status(500).json({ message: 'Error updating red tag', error });
    }
}