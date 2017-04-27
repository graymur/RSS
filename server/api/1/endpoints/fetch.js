import parser from 'rss-parser';

export default function fetch(req, res) {
	parser.parseURL(req.query.url, (err, parsed) => {
		if (err) {
			return res.send({ error: err.toString() });
		}

		return res.send({
			success: true,
			feed: parsed
		});
	});
}
