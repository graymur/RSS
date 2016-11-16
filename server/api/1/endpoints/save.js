const run = require('../util/runGenerator.js');
const GroupModel = require('../models/group.js').model;
const FeedModel = require('../models/feed.js').model;

var dv = function (v) { console.log(JSON.stringify(v, null, 4)); };

module.exports = function(req, res) {
    return run((function * () {
        try {
            const user = req.user;
            const group = yield GroupModel.findOne({user: user._id, title: 'Unsorted'});

            const feed = new FeedModel({
                user: user._id,
                group: group._id,
                title: req.body.title,
                realTitle: req.body.realTitle,
                url: req.body.url
            });

            yield feed.save();

            return res.send({ success: true });
        } catch (e) {
            let response = {};

            if (e.code === 11000) {
                response.error = "You've already added this feed";
            } else {
                response.error = 'Unknown error';
            }

            return res.send(response);
        }
    })());
};