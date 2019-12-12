'use strict'

const db = require('../server/db')
const {User, Review, Location} = require('../server/db/models')

async function seed() {
  await db.sync({force: true})
  console.log('db synced!')

  const users = await User.bulkCreate([
    {
      username: 'jenna',
      email: 'jenna@jenna.com',
      password: 'jenna',
      type: 'admin'
    },
    {
      username: 'clark',
      email: 'clark@clark.com',
      password: '1234',
      type: 'approved'
    },
    {
      username: 'bo',
      email: 'bo@bo.com',
      password: '1234',
      type: null
    }
  ])

  const locations = await Location.bulkCreate([
    {
      name: 'Clinton St. Baking Company',
      address: '4 Clinton St, New York, NY 10002',
      latitude: 40.721589,
      longitude: -73.983775
    },
    {
      name: 'Insomnia Cookies',
      address: '76 Pearl St, New York, NY 10004',
      latitude: 40.712047,
      longitude: -74.011427,
      notes: 'Multiple locations'
    },
    {
      name: 'Sprinkles Cupcakes',
      address: '780 Lexington Ave, New York, NY 10065',
      latitude: 40.76326,
      longitude: -73.96766
    },
    {
      name: 'Pret A Manger',
      address: '1 Astor Pl, New York, NY 10003',
      latitude: 40.73016,
      longitude: -73.9923,
      notes: 'Multiple locations'
    },
    {
      name: 'Ovenly',
      address: '230 Park Ave, New York, NY 10169',
      latitude: 40.7544,
      longitude: -73.97683,
      notes: 'Multiple locations'
    },
    {
      name: 'Baked',
      address: '359 Van Brunt St, Brooklyn, NY 11231',
      latitude: 40.67687,
      longitude: -74.01325
    },
    {
      name: 'Seven Grams Caffe',
      address: '780 Lexington Ave, New York, NY 10065',
      latitude: 40.74398,
      longitude: -73.98587
    },
    {
      name: 'Culture Espresso',
      address: '247 W 36th St, New York, NY 10018',
      latitude: 40.75325,
      longitude: -73.99126
    },
    {
      name: 'EJs Luncheonette',
      address: '1271 3rd Ave, New York, NY 10021',
      latitude: 40.77044,
      longitude: -73.95972
    },
    {
      name: 'Mottley Kitchen',
      address: '402 E 140th St, The Bronx, NY 10454',
      latitude: 40.81016,
      longitude: -73.92166
    },
    {
      name: 'Spot Dessert Bar',
      address: '13 St Marks Pl, New York, NY 10003',
      latitude: 40.72938,
      longitude: -73.98892,
      notes: 'Multiple locations'
    },
    {
      name: 'Michaeli Bakery',
      address: '115A Division St, New York, NY 10002',
      latitude: 40.71434,
      longitude: -73.99205
    },
    {
      name: 'Mollys Cupcakes',
      address: '228 Bleecker St, New York, NY 10014',
      latitude: 40.73011,
      longitude: -74.00251
    },
    {
      name: 'The Standard Grill',
      address: '848 Washington St, New York, NY 10014',
      latitude: 40.74066,
      longitude: -74.00801,
      notes: 'Fancy cookies. They come in threes, with milk'
    },
    {
      name: 'DoubleTree by Hilton Hotel',
      address: '128 W 29th St, New York, NY 10001',
      latitude: 40.74698,
      longitude: -73.99138,
      notes:
        'First cookies to be baked in space! Available at multiple locations'
    },
    {
      name: 'Dominique Ansel',
      address: '189 Spring St, New York, NY 10012',
      latitude: 40.72516,
      longitude: -74.00296
    },
    {
      name: 'Macaron Parlour',
      address: '44 Hester St, New York, NY 10002',
      latitude: 40.7155,
      longitude: -73.99022,
      notes: 'XL Pecan Chocolate Chip'
    },
    {
      name: 'Kreuther Handcrafted Chocolate',
      address: '43 W 42nd St, New York, NY 10036',
      latitude: 40.75447,
      longitude: -73.98275
    },
    {
      name: 'The Wooly Daily',
      address: '11 Barclay St, New York, NY 10007',
      latitude: 40.71244,
      longitude: -74.00829
    }
  ])

  const reviews = await Review.bulkCreate([
    {
      rating: 7,
      reason:
        'Insomnia cookies may not be made with fancy chocolate or baked by gourmet chefs, but they make a solid, classic chocolate chip cookie that has melty chocolate chips and a soft consistency. My one issue is that, compared to the PERFECT cookie, it might be a bit too doughy',
      locationId: 2,
      userId: 1
    },
    {
      rating: 10,
      reason:
        'The perfect cookie. Soft, but not doughy on the outside, crispy and golden on the outside, decent chocolate chips.',
      locationId: 1,
      userId: 1
    }
  ])

  console.log(
    `seeded ${users.length} users, ${reviews.length} reviews, ${
      locations.length
    } locations`
  )
  console.log(`seeded successfully`)
}

// We've separated the `seed` function from the `runSeed` function.
// This way we can isolate the error handling and exit trapping.
// The `seed` function is concerned only with modifying the database.
async function runSeed() {
  console.log('seeding...')
  try {
    await seed()
  } catch (err) {
    console.error(err)
    process.exitCode = 1
  } finally {
    console.log('closing db connection')
    await db.close()
    console.log('db connection closed')
  }
}

// Execute the `seed` function, IF we ran this module directly (`node seed`).
// `Async` functions always return a promise, so we can use `catch` to handle
// any errors that might occur inside of `seed`.
if (module === require.main) {
  runSeed()
}

// we export the seed function for testing purposes (see `./seed.spec.js`)
module.exports = seed
