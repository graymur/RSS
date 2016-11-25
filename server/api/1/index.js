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

router.use(require('./middleware/user.js'));

router.get('/feeds', require('./endpoints/feeds.js'));
router.get('/feed', require('./endpoints/feed.js'));
router.get('/check', require('./endpoints/check.js'));
router.get('/fetch', require('./endpoints/fetch.js'));
router.get('/update', require('./endpoints/update.js'));
router.put('/save', require('./endpoints/save.js'));

router.get('/about', function(req, res) {
    res.send('About birds');
});

module.exports = router;
