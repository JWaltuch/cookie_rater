const router = require('express').Router()
const {User} = require('../db/models')
const {Review} = require('../db/models')
module.exports = router

router.get('/', async (req, res, next) => {
  try {
    const users = await User.findAll({
      // explicitly select only the id and email fields - even though
      // users' passwords are encrypted, it won't help if we just
      // send everything to anyone who asks!
      attributes: ['id', 'email', 'username', 'type']
    })
    res.json(users)
  } catch (err) {
    next(err)
  }
})

router.get('/reviews', async (req, res, next) => {
  try {
    const user = await User.findOne({where: {id: req.user.id}})
    const reviews = await user.getReviews()
    res.json(reviews)
  } catch (err) {
    next(err)
  }
})

//ADMIN ONLY

const checkIfAdmin = (req, res, next) => {
  console.log(req)
  try {
    if (req.user.type === 'admin') {
      next()
    } else {
      let error = new Error('You must be an admin to perform this action.')
      return next(error)
    }
  } catch (err) {
    next(err)
  }
}

router.put(
  '/:userId',
  function(req, res, next) {
    try {
      if (req.user.type === 'admin') {
        next()
      } else {
        let error = new Error('You must be an admin to perform this action.')
        return next(error)
      }
    } catch (err) {
      next(err)
    }
  },
  async (req, res, next) => {
    try {
      const [, user] = await User.update(
        {type: req.body.type},
        {where: {id: req.params.userId}}
      )
      res.json(user)
    } catch (err) {
      next(err)
    }
  }
)
