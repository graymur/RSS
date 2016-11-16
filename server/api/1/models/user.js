var mongoose = require('mongoose');
var Schema = mongoose.Schema;

const db = require('../db.js');

var User = new Schema({
    name: { type: String, required: true },
    outerId: { type: String, required: true },
    service: { type: String, required: true }
});

User.index({
    outerId: 1,
    service: 1
}, { unique: true });

var UserModel = mongoose.model('User', User);

module.exports = {
    schema: User,
    model: UserModel
};