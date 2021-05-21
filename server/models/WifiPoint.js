const { Schema, model } = require('mongoose');

const locationSchema = new Schema({
    type: {
        type: String,
        default: "Point",
    },
    coordinates: {
        type: [Number],
    }
});

const wifiPointSchema = new Schema({
    name: { type: String, required: true },
    userId: { type: Schema.Types.ObjectId, required: true },
    location: locationSchema,
    address: { type: String, required: true },
    type: { type: String, required: true },
    password: { type: String, default: ""},
    speed: { type: Number, required: true },
    frequency: { type: Number, required: true },
}, { versionKey: false });

wifiPointSchema.index({ location: '2dsphere' });

module.exports = model('WifiPoint', wifiPointSchema);
