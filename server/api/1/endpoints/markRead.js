import { FeedModel } from '../../../models/feed';
import { PostModel } from '../../../models/post';

export default async function makrRead(req, res) {
	try {
		let feed = await FeedModel.findOne({user: req.user._id, _id: req.body.feedId});
		if (!feed) throw new Error('Feed not found');

		let post = await PostModel.findOne({feed: feed._id, _id: req.body.id});
		if (!post) throw new Error('Post not found');

		post.read = true;
		feed.unread--;

		await new Promise.all([post.save(), feed.save()]);

		return res.send({ count: feed.count, unread: feed.unread });
	} catch (e) {
		return res.send({error: e.toString()});
	}
}
