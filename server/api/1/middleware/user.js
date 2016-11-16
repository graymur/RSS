const UserModel = require('../models/user.js').model;
const run = require('../util/runGenerator.js');

module.exports = (req, res, next) => {
    return run((function * () {
        const user = yield UserModel.findOne({ outerId: 1 });

        if (!user) {

        }

        req.user = user;

        return next();
    })());
};