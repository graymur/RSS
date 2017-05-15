import {FeedModel} from '../../../models/feed';
import {GroupModel} from '../../../models/group';
import getDefaultGroup from '../../../util/getDefaultGroup';

export default async function save(req, res) {
	try {
		const user = req.user;
		const group = await getDefaultGroup(user);

		const feed = new FeedModel({
			user: user._id,
			group: group._id,
			title: req.body.title,
			realTitle: req.body.realTitle,
			url: req.body.url
		});

		await feed.save();

		return res.send({success: true});
	} catch (e) {
		let response = {};

		if (e.code === 11000) {
			response.error = 'You\'ve already added this feed';
		} else {
			response.error = 'Unknown error';
		}

		return res.status(500).send({error: e.toString()});
	}
}
