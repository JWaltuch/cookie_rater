const Sequelize = require('sequelize')
const db = require('../db')

const Review = db.define('review', {
  rating: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  reason: {
    type: Sequelize.TEXT,
    allowNull: false
  }
})

module.exports = Review
