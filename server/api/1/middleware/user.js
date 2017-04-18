import { UserModel } from '../models/user';

export default async function user(req, res, next) {
	const user = await UserModel.findOne({outerId: 1});

	if (!user) {

	}

	req.user = user;
	return next();
}
