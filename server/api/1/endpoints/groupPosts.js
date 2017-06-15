import {GroupModel} from '../../../models/group';
import {FeedModel} from '../../../models/feed';
import {PostModel} from '../../../models/post';
import {toCleanObject} from '../util/cleanUpObjects';

export default async function feed(req, res) {
	try {
		const group = await GroupModel.findOne({user: req.user._id, _id: req.query.groupId});
		const feeds = await FeedModel.find({group: group._id}, ['_id']);
		const feedsIds = feeds.map(x => x._id);
		const posts = await PostModel.find({feed: {'$in': feedsIds}}).sort([['date', 'descending']]);

		if (!group) {
			throw new Error('Group not found');
		}

		return res.send(posts.map(toCleanObject));
	} catch (e) {
		return res.status(500).send({error: e.toString()});
	}
}
