const parser = require('rss-parser');
const co = require('co');

const FeedModel = require('../models/feed.js').model;
const PostModel = require('../models/post.js').model;
const dv = require('../util/dv.js');

module.exports = function(req, res) {
    return co(function * () {
        try {
            let feed = yield FeedModel.findOne({user: req.user._id, _id: req.body.feedId});
            if (!feed) throw new Error('Feed not found');

            let post = yield PostModel.findOne({feed: feed._id, _id: req.body.id});
            if (!post) throw new Error('Post not found');

            post.read = true;
            yield post.save();

            feed.unread--;
            yield feed.save();

            return res.send({ count: feed.count, unread: feed.unread });
        } catch (e) {
            return res.send({error: e.toString()});
        }
    });
};
