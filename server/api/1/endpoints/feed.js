import { FeedModel } from '../models/feed';
import { PostModel } from '../models/post';
import { toCleanObject } from '../util/cleanUpObjects';

export default async function feed(req, res) {
	try {
		let feed = await FeedModel.findOne({user: req.user._id, _id: req.query.id});
		const posts = await PostModel.find({feed: feed._id}).sort([['date', 'descending']]);

		feed = toCleanObject(['realTitle'])(feed);
		feed.posts = posts.map(toCleanObject);

		return res.send(feed);
	} catch (e) {
		return res.send({error: e.toString()});
	}
}
