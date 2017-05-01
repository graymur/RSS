import { UserModel } from '../../../models/user';

export default async function user(req, res, next) {
	// const user = await UserModel.findOne({outerId: 1});

	const user = false;

	if (!user) {
		return res.send(401);
	}

	req.user = user;
	return next();
}
