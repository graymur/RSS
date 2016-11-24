const GroupModel = require('../models/group.js').model;
const FeedModel = require('../models/feed.js').model;
const run = require('../util/runGenerator.js');
const toCleanObject = require('../util/cleanUpObjects').toCleanObject;
const dv = require('../util/dv.js');

module.exports = function(req, res) {
    return run((function * () {
        const groups = yield GroupModel.find({ user: req.user._id });
        const feeds = yield FeedModel.find({ user: req.user._id });

        //const retval = [];

        //for (var i = 0; i < groups.length; i++) {
        //    const group = toCleanObject(groups[i]);
        //    group.feeds = feeds.filter(feed => {
        //        return String(feed.group) == String(groups[i]._id);
        //    }).map(toCleanObject(['realTitle', 'modified']));
        //
        //    retval.push(group);
        //}

        return res.send({
            groups: groups.map(toCleanObject),
            feeds: feeds.map(toCleanObject)
        });
    })());
};