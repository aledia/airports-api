const express = require('express');
const router = express.Router();
const Airports = require("../models/airportModel")

/* GET home page */
router.get('/airports', (req, res, next) => {
  Airports
    .find({name: /Ironhack/gi})
    .select({ _id: 0 })
    // .limit(5)
    .then(airports => res.json(airports))
});

router.get('/theMap', (req, res) => {
  res.render("map")
})

router.get('/newAirport', (req, res) => {
  res.render("newAirports")
})

router.post('/newAirport', (req, res) => {
  if (req.body.longitude < -180 || req.body.longitude > 180) {
    res.status(500).json({error: true, "reason" : "longitude is wrong"})
  }
  // add the airport via mongoose
  Airports
    .create({
      name: req.body.name,
      coords: {
        coordinates: [
          req.body.longitude,
          req.body.latitude
        ]
      }
    })
    .then(completedAirport => res.redirect("/newAirport"))
})

module.exports = router;
