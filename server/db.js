import mongoose from 'mongoose';

mongoose.connect('mongodb://localhost/node-rss');
const db = mongoose.connection;

db.on('error', err => {
	console.log('connection error:', err.message);
});

db.once('open', callback => console.log('Connected to DB!'));

export default db;
