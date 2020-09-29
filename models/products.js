const sequelize = require('../utils/database')

const Sequelize = require('sequelize')

const Product = sequelize.define('products', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
    },
    name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    description: {
        type: Sequelize.STRING,
        allowNull: false
    },
    size: {
        type: Sequelize.STRING,
        allowNull: false
    },
    brand: {
        type: Sequelize.STRING,
        allowNull: false
    },
    quantiny: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    price: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    storeId: {
        type: Sequelize.STRING,
        allowNull: false
    },
    image: {
        type: Sequelize.STRING,
        allowNull: false
    },
    userId: {
        type: Sequelize.INTEGER,
        allowNull: false
    }
})

module.exports = Product;