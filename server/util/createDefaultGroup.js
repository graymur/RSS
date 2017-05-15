import {GroupModel} from '../models/group';
import getDefaultGroup from './getDefaultGroup';

export const DEFAULT_GROUP_TITLE = 'Unsorted';
export const DEFAULT_GROUP_KEY = 'unsorted';

export default async function createDefaultGroup(user) {
	let group = getDefaultGroup(user);

	if (!group) {
		group = new GroupModel({
			user: user,
			title: DEFAULT_GROUP_TITLE,
			key: DEFAULT_GROUP_KEY
		});

		await group.save();
	}

	return group;
}