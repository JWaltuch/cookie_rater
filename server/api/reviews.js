const router = require('express').Router()
const {Review} = require('../db/models')
const {User} = require('../db/models')
module.exports = router

router.get('/', async (req, res, next) => {
  try {
    const reviews = await Review.findAll({})
    res.json(reviews)
  } catch (err) {
    next(err)
  }
})

router.get('/:locId', async (req, res, next) => {
  try {
    const location = await Location.findOne({where: {id: req.params.locId}})
    const reviews = await location.getReviews()
    res.json(reviews)
  } catch (err) {
    next(err)
  }
})

router.post('/', async (req, res, next) => {
  try {
    const user = await User.findOne({where: {id: req.user.id}})
    const newReview = Review.create(req.body)
    await user.addReview(newReview)
    res.json(newReview)
  } catch (err) {
    next(err)
  }
})

//ADMIN ROUTE ONLY

router.delete('/:reviewId', async (req, res, next) => {
  try {
    const review = await Review.findOne({where: {id: req.params.reviewId}})
    await Review.destroy({where: {id: req.params.reviewId}})
    res.json(review)
  } catch (err) {
    next(err)
  }
})
