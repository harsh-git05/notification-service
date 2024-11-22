const express = require('express');
const Notification = require('../models/notification');
const sendEmail = require('./emailService');

const router = express.Router();

// Create a notification
router.post('/email', async (req, res) => {
    const { type, recipient, message } = req.body;
    
    try {
        const notification = await Notification.create({ type, recipient, message });

        // If email notification, send it immediately
        
        await sendEmail(recipient, message);
        notification.status = 'sent';
        await notification.save();
        
        res.status(201).json(notification);
    } catch (error) {
        res.status(500).json({ error: 'Failed to create notification' });
        
        if (error.name === 'SequelizeValidationError') {
            const validationErrors = error.errors.map(err => err.message);
            return res.status(400).json({ message: 'Validation errors occurred', errors: validationErrors });
          }
    }
});

// Fetch email notifications
router.get('/email_list', async (req, res) => {
    try {
        const notifications = await Notification.findAll({ where: 
            { 
                type: "email" }
                // order: [['created_at', 'DESC']]
                 });
        res.json(notifications);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch notifications' });
    }
});

router.post('/portal', async (req, res) => {
    const { type, recipient, message } = req.body;

    try {
        const notification = await Notification.create({ type, recipient, message });

        
        
        notification.status = 'sent';
        await notification.save();
        res.status(201).json(notification);
        
    }
     catch (error) {
        res.status(500).json({ error: 'Failed to create notification' });

        if (error.name === 'SequelizeValidationError') {
            const validationErrors = error.errors.map(err => err.message);
            return res.status(400).json({ message: 'Validation errors occurred', errors: validationErrors });
          }
    }
});

router.get('/portal_list', async (req, res) => {
    try {
        const notifications = await Notification.findAll({ where: 
            { 
                type: "portal" }
                // order: [['created_at', 'DESC']]
                 });
        res.json(notifications);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch notifications' });
    }
});

router.post('/web', async (req, res) => {
    const { type, recipient, message } = req.body;

    try {
        const notification = await Notification.create({ type, recipient, message });

        
            notification.status = 'sent';
            await notification.save();
            res.status(201).json(notification);
        

        
        
    } catch (error) {
        res.status(500).json({ error: 'Failed to create notification' });
        
        if (error.name === 'SequelizeValidationError') {
            const validationErrors = error.errors.map(err => err.message);
            return res.status(400).json({ message: 'Validation errors occurred', errors: validationErrors });
          }
    }
});

router.get('/web_list', async (req, res) => {
    try {
        const notifications = await Notification.findAll({ where: 
            { 
                type: "web" }
                // order: [['created_at', 'DESC']]
                 });
        res.json(notifications);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch notifications' });
    }
});


module.exports = router;
