const sequelize = require('../utils/database')

const Sequelize = require('sequelize')

const Store = sequelize.define('stores', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
    },
    storeName: {
        type: Sequelize.STRING,
        allowNull: false
    },
    ownerId: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
})
module.exports = Store;