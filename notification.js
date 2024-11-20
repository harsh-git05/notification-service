const { DataTypes } = require('sequelize');
const sequelize = require('../db');

const Notification = sequelize.define('notification', {
    type: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    recipient: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    message: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    status: {
        type: DataTypes.STRING,
        defaultValue: 'pending',
    },
}, {
    tableName: 'notifications',
    timestamps: true,
});

module.exports = Notification;