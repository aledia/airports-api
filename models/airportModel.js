const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const airportSchema = new Schema({
  name: String,
  coords: { type: { type: String }, coordinates: [Number] }
}, {
    timestamps: true
  });

const Airports = mongoose.model("locations", airportSchema);
module.exports = Airports;