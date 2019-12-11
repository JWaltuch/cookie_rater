const router = require('express').Router()
const {Location} = require('../db/models')
module.exports = router

router.get('/', async (req, res, next) => {
  try {
    const locations = await Location.findAll({order: ['id']})
    res.json(locations)
  } catch (err) {
    next(err)
  }
})

router.get('/:id', async (req, res, next) => {
  try {
    const location = await Location.findOne({where: {id: req.params.id}})
    res.json(location)
  } catch (err) {
    next(err)
  }
})

//ADMIN ONLY

router.post('/', async (req, res, next) => {
  try {
    const newLocation = await Location.create(req.body)
    res.json(newLocation)
  } catch (err) {
    next(err)
  }
})

router.put('/:locId', async (req, res, next) => {
  try {
    const updates = req.body
    const [_, locationToUpdate] = await Location.update(updates, {
      where: {id: req.params.locId}
    })
    res.json(locationToUpdate)
  } catch (err) {
    next(err)
  }
})

router.post('/', async (req, res, next) => {
  try {
    const newLocation = await Location.create(req.body)
    res.json(newLocation)
  } catch (err) {
    next(err)
  }
})
