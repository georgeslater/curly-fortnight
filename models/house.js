const mongoose = require('mongoose');

var roomSchema = new mongoose.Schema({
    numBedrooms: Number,
    numBedroomsText: String,
    numBathrooms: Number,
    hasLivingRoom: Boolean,
    hasPatio: Boolean,
    hasDiningRoom: Boolean
});

var houseSchema = new mongoose.Schema({
    externalId: {type: String, index: true },
    rooms: roomSchema,
    year: Number,
    hasAirConditioning: Boolean,
    hasGarage: Boolean,
    area: String,
    description: String,
    zone: String,
    location: String,
    sellerPhoneNumber: String,
    price: Number,
	priceText: String,
    currency: String,
    isPrivateNeighbourhood: Boolean,
    hasGarden: Boolean,
    created_at: { type: Date, required: true, default: Date.now },
    updated_at: { type: Date, required: true, default: Date.now }
});

module.exports = houseSchema;
