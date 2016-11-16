const parser = require('rss-parser');

var dv = function (v) { console.log(JSON.stringify(v, null, 4)); };

module.exports = function(req, res) {
    parser.parseURL(req.query.url, (err, parsed) => {
        if (err) {
            return res.send({ error: err.toString() });
        }

        return res.send({
            success: true,
            feed: parsed
        });
    });
};