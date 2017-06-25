import {FeedModel} from '../../../models/feed';
import getDefaultGroup from '../../../util/getDefaultGroup';
import {toCleanObject} from '../util/cleanUpObjects';

export default async function save(req, res) {
	try {
		const user = req.user;
		const group = await getDefaultGroup(user);
		let feed;

		if (req.body.id) {
			feed = await FeedModel.findOne({user: req.user._id, _id: req.body.id});

			if (!feed) {
				throw new Error('Feed not found');
			}

			feed.url = req.body.url;
			feed.title = req.body.title;
		} else {
			feed = new FeedModel({
				user: user._id,
				group: group._id,
				title: req.body.title,
				realTitle: req.body.realTitle,
				url: req.body.url
			});
		}

		await feed.save();

		return res.send({success: true, feed: toCleanObject(['realTitle'])(feed)});
	} catch (e) {
		let response = {};

		if (e.code === 11000) {
			response.error = 'You\'ve already added this feed';
		} else {
			response.error = 'Unknown error';
		}

		res.statusMessage = response.error;
		return res.status(500).end();
	}
}
