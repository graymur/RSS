var mongoose = require('mongoose');
var log = require('./log')(module);

mongoose.connect('mongodb://localhost/node-rss');
var db = mongoose.connection;

db.on('error', err => {
	log.error('connection error:', err.message);
});

db.once('open', callback => log.info('Connected to DB!'));

module.exports = db;
