import parser from 'rss-parser';
import {FeedModel} from '../../../models/feed';
import {GroupModel} from '../../../models/group';
import {toCleanObject} from '../util/cleanUpObjects';

export default async function (req, res) {
	try {
		let feed = await FeedModel.findOne({user: req.user._id, _id: req.body.feedId});		
		if (!feed) {
			throw new Error('Feed not found');
		}

		let group = await GroupModel.findOne({user: req.user._id, _id: req.body.groupId});
		if (!group) {
			throw new Error('Group not found');
		}
		
		feed.group = group._id;

		await feed.save();

		return res.send({
			success: true,
			feed: toCleanObject(feed)
		});
	} catch (e) {
		res.statusMessage = e.toString();
		return res.status(500).end();
	}
}
