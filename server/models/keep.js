var models = require('../config/constants').models
let mongoose = require('mongoose')
let ObjectId = mongoose.Schema.ObjectId

var schema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String },
    url: { type: String },
    private: { type: Boolean, default: false },
    created: { type: Number, default: Date.now() },
    creatorId: { type: ObjectId, ref: models.user.name, required: true },
    adds: { type: Number, default: 0 }
});

module.exports = mongoose.model(models.keep.name, schema);