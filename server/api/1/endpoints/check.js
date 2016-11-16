const parser = require('rss-parser');

module.exports = function(req, res) {
    parser.parseURL(decodeURIComponent(req.query.url), (err, parsed) => {
        if (err) {
            return res.send({ error: err.toString() });
        }

        return res.send({
            success: true,
            title: parsed.feed.title
        });
    });
};