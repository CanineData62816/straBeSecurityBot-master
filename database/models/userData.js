const Sequelize = require('sequelize');
const sequelize = require('.../database/util/database.js');

/*const UserData = sequelize.define('userData', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    username: {
        type: Sequelize.STRING,
        allowNull: false
    },
    points: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0
    },
    verified: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false
    },
    robloxID: {
        type: Sequelize.INTEGER,
        allowNull: false,
        unique: true
    },
    discordID: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
    },
    wallet: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 1000
    },
    bank: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0
    },
    notes: {
        type: Sequelize.STRING,
        allowNull: true,
        defaultValue: null
    },
    discordTag: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
    },
    infractions: {
        type: Sequelize.JSON,
        allowNull: true,
        defaultValue: {}
    },
    userRanks: {
        type: Sequelize.JSON,
        allowNull: true,
        defaultValue: {'main': 'member', 'security': 'trainee', 'SERT': 'Field Trainee'}
    },
});*/

module.exports = {
    userData: sequelize.define('userData', {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true
        },
        username: {
            type: Sequelize.STRING,
            allowNull: false
        },
        points: {
            type: Sequelize.INTEGER,
            allowNull: false,
            defaultValue: 0
        },
        verified: {
            type: Sequelize.BOOLEAN,
            allowNull: false,
            defaultValue: false
        },
        robloxID: {
            type: Sequelize.INTEGER,
            allowNull: false,
            unique: true
        },
        discordID: {
            type: Sequelize.STRING,
            allowNull: false,
            unique: true
        },
        wallet: {
            type: Sequelize.INTEGER,
            allowNull: false,
            defaultValue: 1000
        },
        bank: {
            type: Sequelize.INTEGER,
            allowNull: false,
            defaultValue: 0
        },
        notes: {
            type: Sequelize.STRING,
            allowNull: true,
            defaultValue: null
        },
        discordTag: {
            type: Sequelize.STRING,
            allowNull: false,
            unique: true
        },
        infractions: {
            type: Sequelize.JSON,
            allowNull: true,
            defaultValue: {}
        },
        userRanks: {
            type: Sequelize.JSON,
            allowNull: true,
            defaultValue: {'main': 'member', 'security': 'trainee', 'SERT': 'Field Trainee'}
        },
    }),
}