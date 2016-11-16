var mongoose = require('mongoose');
var Schema = mongoose.Schema;

const db = require('../db.js');

var Feed = require('./feed.js').schema;
var User = require('./user.js').schema;

var Post = new Schema({
    user: { ref: 'User', type: mongoose.Schema.ObjectId },
    feed: { ref: 'Feed', type: mongoose.Schema.ObjectId },
    title: { type: String, required: true },
    link: { type: String, required: true },
    author: { type: String },
    content: { type: String, required: true },
    id: { type: String, required: true },
    date: { type: Date, default: Date.now },
    read: { type: Boolean, default: false }
});

Post.index({
    feed: 1,
    id: 1
}, { unique: true });

var PostModel = mongoose.model('Post', Post);

module.exports = {
    schema: Post,
    model: PostModel
};