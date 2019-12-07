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
    const locationToUpdate = await Location.update(updates, {
      where: {id: req.params.locId}
    })
    res.json(locationToUpdate)
  } catch (err) {
    next(err)
  }
})
