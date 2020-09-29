const sequelize = require('../utils/database')

const Sequelize = require('sequelize')

const User = sequelize.define('users', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
    },
    firstName: {
        type: Sequelize.STRING,
        allowNull: false
    },
    secondName: {
        type: Sequelize.STRING,
        allowNull: false
    },
    email: {
        type: Sequelize.STRING,
        allowNull: false
    },
    role: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    password: {
        type: Sequelize.STRING,
        allowNull: false
    }
})

module.exports = User;