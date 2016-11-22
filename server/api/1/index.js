const runGenerator = require('./util/runGenerator.js');

const express = require('express');
const router = express.Router();

const dv = function (v) { console.log(JSON.stringify(v, null, 4)); };

const url = 'http://feeds.feedburner.com/bigpictures';

const parser = require('rss-parser');

const FeedModel = require('./models/feed.js').model;
const PostModel = require('./models/post.js').model;
const UserModel = require('./models/user.js').model;
const GroupModel = require('./models/group.js').model;

//runGenerator((function * () {
//    const user = yield UserModel.findOne({ outerId: 1 });
//    const group = yield GroupModel.findOne({ user: user._id });
//
//    const feeds = yield FeedModel.findOne({ user: user._id });
//
//    const promise = new Promise((resolve, reject) => {
//        parser.parseURL(url, (err, parsed) => {
//            if (err) {
//                reject(err);
//            } else {
//                resolve(parsed);
//            }
//        });
//    });
//
//    const parsed = yield promise;
//
//    let feed = yield FeedModel.findOne({ user: user._id, url: parsed.feed.link });
//
//    if (!feed) {
//        feed = new FeedModel({
//            user: user._id,
//            group: group._id,
//            title: parsed.feed.title,
//            url: parsed.feed.link
//        });
//
//        yield feed.save();
//    }
//
//    parsed.feed.entries.forEach(function (post) {
//        post = new PostModel({
//            title: post.title,
//            link: post.link,
//            author: post.author,
//            content: post.content,
//            id: post.id,
//            date: Date.parse(post.pubDate),
//            feed: feed._id,
//            user: user._id
//        });
//
//        post.save().catch(e => {
//            //if (e) {
//            //    console.log(e.toString());
//            //}
//        });
//    });
//})());

router.use(require('./middleware/user.js'));

router.get('/feeds', require('./endpoints/feeds.js'));
router.get('/check', require('./endpoints/check.js'));
router.get('/fetch', require('./endpoints/fetch.js'));
router.put('/save', require('./endpoints/save.js'));

router.get('/about', function(req, res) {
    res.send('About birds');
});

module.exports = router;
