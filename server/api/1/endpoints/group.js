import {GroupModel} from '../../../models/group';
import {toCleanObject} from '../util/cleanUpObjects';

export default async function save(req, res) {
	try {
		const user = req.user;
		let group;

		if (req.body.id) {
			group = await GroupModel.findOne({user: req.user._id, _id: req.body.id});

			if (!group) {
				throw new Error('Feed not found');
			}

			group.title = req.body.title;
		} else {
			group = new GroupModel({
				user: user._id,
				title: req.body.title,
				key: req.body.title
			});
		}

		await group.save();

		return res.send({success: true, group: toCleanObject(['realTitle'])(group)});
	} catch (e) {
		let response = {};

		if (e.code === 11000) {
			response.error = 'You\'ve already added this group';
		} else {
			response.error = 'Unknown error';
		}

		res.statusMessage = response.error;
		return res.status(500).end();
	}
}
