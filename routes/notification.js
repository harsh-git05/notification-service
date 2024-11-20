const express = require('express');
const Notification = require('../models/notification');
//const sendEmail = require('../emailService');

const router = express.Router();

// Create a notification
router.post('/create', async (req, res) => {
    const { type, recipient, message } = req.body;

    try {
        const notification = await Notification.create({ type, recipient, message });

        // If email notification, send it immediately
        if (type === 'email') {
            await sendEmail(recipient, message);
            notification.status = 'sent';
            await notification.save();
        }
        if (type === 'portal') {
            notification.status = 'sent';
            await notification.save();
        }

        if (error.name === 'SequelizeValidationError') {
            const validationErrors = error.errors.map(err => err.message);
            return res.status(400).json({ message: 'Validation errors occurred', errors: validationErrors });
          }
        res.status(201).json(notification);
    } catch (error) {
        res.status(500).json({ error: 'Failed to create notification' });
    }
});

// Fetch portal notifications

router.get('/portal', async (req, res) => {
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

router.get('/list', async (req, res) => {
    try {
      const notification = await Notification.findAll();
      return res.status(200).json({ message:'notification list',notification});
    } catch (error) {
      console.error('Error fetching list:', error);
  
      if (error.name === 'SequelizeValidationError') {
        const validationErrors = error.errors.map(err => err.message);
        return res.status(400).json({ message: 'Validation errors occurred', errors: validationErrors });
      }
  
      res.status(500).json({ message: 'failed to fetch list.' });
    }
  });

module.exports = router;
