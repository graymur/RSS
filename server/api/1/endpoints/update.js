const parser = require('rss-parser');

const FeedModel = require('../models/feed.js').model;
const PostModel = require('../models/post.js').model;
const run = require('../util/runGenerator.js');
const toCleanObject = require('../util/cleanUpObjects').toCleanObject;
const dv = require('../util/dv.js');

module.exports = function(req, res) {
    return run((function * () {
        try {
            let feed = yield FeedModel.findOne({user: req.user._id, _id: req.query.id});

            if (!feed) throw new Error('Feed not found');

            const promise = new Promise((resolve, reject) => {
                parser.parseURL(feed.url, (err, parsed) => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(parsed);
                    }
                });
            });

            const parsed = yield promise;

            let saved = parsed.feed.entries.length;

            for (let i = 0; i < parsed.feed.entries.length; i++) {
                let post = parsed.feed.entries[i];

                post = new PostModel({
                    title: post.title,
                    link: post.link,
                    author: post.author,
                    content: post.content,
                    id: post.link,
                    date: Date.parse(post.pubDate),
                    feed: feed._id,
                    user: req.user._id
                });

                yield post.save().catch(e => saved--);
            }

            feed.lastUpdate = Date.now();
            feed.count += saved;
            feed.unread += saved;
            yield feed.save();

            let posts = yield PostModel.find({
                user: req.user._id,
                feed: feed.id
            }).sort([['date', 'descending']]);

            feed = toCleanObject(feed);
            feed.posts = posts.map(toCleanObject);

            return res.send(feed);
        } catch (e) {
            return res.send({error: e.toString()});
        }
    })());
};