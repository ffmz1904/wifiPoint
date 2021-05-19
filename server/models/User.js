const { Schema, model } = require('mongoose');

const userSchema = new Schema({
    email: { type: String, required: true },
    password: { type: String, required: true, select: false },
    role: { type: String, required: true },
}, { versionKey: false });

module.exports = model('User', userSchema);
