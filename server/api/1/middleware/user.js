const co = require('co');
const UserModel = require('../models/user.js').model;

module.exports = (req, res, next) => {
	return co(function * () {
		const user = yield UserModel.findOne({outerId: 1});

		if (!user) {

		}

		req.user = user;
		return next();
	});
};
