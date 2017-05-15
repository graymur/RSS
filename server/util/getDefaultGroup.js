import {GroupModel} from '../models/group';
import {DEFAULT_GROUP_TITLE} from './createDefaultGroup';

export default async function getDefaultGroup(user) {
	return await GroupModel.findOne({user: user._id, title: DEFAULT_GROUP_TITLE});
}