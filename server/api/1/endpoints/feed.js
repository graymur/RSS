const co = require('co');
const FeedModel = require('../models/feed.js').model;
const PostModel = require('../models/post.js').model;
const toCleanObject = require('../util/cleanUpObjects').toCleanObject;
const dv = require('../util/dv.js');

module.exports = function(req, res) {
    return co(function * () {
        try {
            let feed = yield FeedModel.findOne({user: req.user._id, _id: req.query.id});
            const posts = yield PostModel.find({feed: feed._id}).sort([['date', 'descending']]);

            feed = toCleanObject(['realTitle'])(feed);
            feed.posts = posts.map(toCleanObject);

            //setTimeout(() => {
            return res.send(feed);
            //}, 5000000);
        } catch (e) {
            return res.send({error: e.toString()});
        }
    });
};
