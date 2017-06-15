import parser from 'rss-parser';
import { FeedModel } from '../../../models/feed';
import { PostModel } from '../../../models/post';
import { toCleanObject } from '../util/cleanUpObjects';

export default async function (req, res) {
	try {
		let feed = await FeedModel.findOne({user: req.user._id, _id: req.query.id});

		if (!feed) {
			throw new Error('Feed not found');
		}

		const promise = new Promise((resolve, reject) => {
			parser.parseURL(feed.url, (err, parsed) => {
				if (err) {
					reject(err);
				} else {
					resolve(parsed);
				}
			});
		});

		const parsed = await promise;

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

			await post.save().catch(e => saved--);
		}

		feed.lastUpdate = Date.now();
		feed.count += saved;
		feed.unread += saved;
		await feed.save();

		let posts = await PostModel.find({
			user: req.user._id,
			feed: feed.id
		}).sort([['date', 'descending']]);

		return res.send({
			feed: toCleanObject(feed),
			posts: posts.map(toCleanObject)
		});
	} catch (e) {
		return res.status(500).send({error: e.toString()});
	}
}
