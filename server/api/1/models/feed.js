var mongoose = require('mongoose');
var Schema = mongoose.Schema;

const db = require('../db.js');

var User = require('./user.js').schema;
var Group = require('./group.js').schema;

var Feed = new Schema({
    user: { ref: 'User', type: mongoose.Schema.ObjectId },
    group: { ref: 'Group', type: mongoose.Schema.ObjectId },
    title: { type: String, required: true },
    realTitle: { type: String, required: true },
    url: { type: String, required: true },
    modified: { type: Date, default: Date.now },
    lastUpdate: { type: Date, default: null }
});

Feed.index({
    user: 1,
    url: 1
}, { unique: true });

var FeedModel = mongoose.model('Feed', Feed);

module.exports = {
    schema: Feed,
    model: FeedModel
};