const User = require('./user')
const Review = require('./review')
const Location = require('./location')

Review.belongsTo(User)
User.hasMany(Review)

Review.belongsTo(Location)
Location.hasMany(Review)

module.exports = {
  User,
  Review,
  Location
}
