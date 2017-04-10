const co = require('co');
const GroupModel = require('../models/group.js').model;
const FeedModel = require('../models/feed.js').model;
const toCleanObject = require('../util/cleanUpObjects').toCleanObject;
const dv = require('../util/dv.js');

module.exports = function(req, res) {
    return co(function * () {
        const groups = yield GroupModel.find({ user: req.user._id });
        const feeds = yield FeedModel.find({ user: req.user._id });

        return res.send({
            groups: groups.map(toCleanObject),
            feeds: feeds.map(toCleanObject)
        });
    });
};
