var mongoose = require('mongoose');
var Schema = mongoose.Schema;

const db = require('../db.js');

var User = require('./user.js').schema;

var Group = new Schema({
    user: { ref: 'User', type: mongoose.Schema.ObjectId },
    //user: { type: User, required: true },
    title: { type: String,  required: true }
});

var GroupModel = mongoose.model('Group', Group);

module.exports = {
    schema: Group,
    model: GroupModel
};