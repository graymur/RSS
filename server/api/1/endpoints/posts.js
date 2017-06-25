import {GroupModel} from '../../../models/group';
import {FeedModel} from '../../../models/feed';
import {PostModel} from '../../../models/post';
import {toCleanObject} from '../util/cleanUpObjects';

export default async function feed(req, res) {
	try {
		const conditions = {};

		if (req.query.groupId) {
			const group = await GroupModel.findOne({user: req.user._id, _id: req.query.groupId});

			if (!group) {
				throw new Error('Group not found');
			}

			const feeds = await FeedModel.find({group: group._id}, ['_id']);
			const feedsIds = feeds.map(x => x._id);

			conditions['feed'] = {'$in': feedsIds};
		} else if (req.query.feedId) {
			let feed = await FeedModel.findOne({user: req.user._id, _id: req.query.feedId});
			conditions['feed'] = {'$in': feed._id};
		}

		const posts = await PostModel.find(conditions).sort([['date', 'descending']]);

		return res.send(posts.map(toCleanObject));
	} catch (e) {
		res.statusMessage = e.toString();
		return res.status(500).end();
	}
}
