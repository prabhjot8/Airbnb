const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const listingSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: String,
  image: {
    type: String,
    default: "/assets/juan-domenech-Tv9nAqpZUYI-unsplash.jpg", //if image ka url pass hi na kiya ho(image is undefined/null/doesn't exist)
    set: (v) =>
      v === "" ? "/assets/juan-domenech-Tv9nAqpZUYI-unsplash.jpg" : v, //if image aarhi hai par empty hai(image toh hai par link is empty)-->for client(frontend)
  },
  price: Number,
  location: String,
  country: String,
});

const Listing = mongoose.model("Listing", listingSchema);

module.exports = Listing;
