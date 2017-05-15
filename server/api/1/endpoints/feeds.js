import { FeedModel } from '../../../models/feed';
import { GroupModel } from '../../../models/group';
import { toCleanObject } from '../util/cleanUpObjects';

export default async function feeds(req, res) {
	try {
		res.send({
			groups: (await GroupModel.find({ user: req.user._id })).map(toCleanObject),
			feeds: (await FeedModel.find({ user: req.user._id })).map(toCleanObject)
		});
	} catch (e) {
		return res.status(500).send({error: e.toString()});
	}
}
