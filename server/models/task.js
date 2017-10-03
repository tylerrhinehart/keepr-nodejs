var models = require('../config/constants').models
let mongoose = require('mongoose')
let ObjectId = mongoose.Schema.ObjectId

var schema = new mongoose.Schema({
	name: { type: String, required: true },
	description: { type: String, required: true },
	created: { type: Number, default: Date.now() },
	position: { type: Number, default: 0},
	// Relations
	creatorId: {type: ObjectId, ref: models.user.name, required: true},
    boardId: { type: ObjectId, ref: models.board, required: true },
    listId: { type: ObjectId, ref: models.list, required: true}
});

schema.pre('remove', function(next) {
    comment.remove({taskId: this._id}).exec();
    next();
});

module.exports = mongoose.model(models.task.name, schema);