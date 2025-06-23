const express = require('express');
const router = express.Router();
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Register a new user
router.post('/register', async (req, res) => {
    const { employeeID, name, phone, email, password } = req.body;

    try {
        // Check if user already exists
        const existingUser = await User.findByEmployeeID(employeeID);
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }
        // Hash the password
        const hashedPassword = await bcrypt.hash(password);
        // Create a new user
        const newUser = new User({
            employeeID,
            name,
            phone,
            email,
            password: hashedPassword
        });
        await newUser.save();
        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        console.error('Error registering user:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

// Login a user
router.post('/login', async (req, res) => {
    const { employeeID, password } = req.body;

    try {
        // Find the user by employeeID
        const user = await User.findByEmployeeID(employeeID);
        if (!user) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }
        // Compare the password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }
        // Generate a JWT token
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.status(200).json({ token, user: { id: user._id, employeeID: user.employeeID, name: user.name, phone: user.phone, email: user.email } });
    } catch (error) {
        console.error('Error logging in:', error);
        res.status(500).json({ message: 'Server error' });
    }
});
