import {UserModel} from '../models/user';
import jwt from 'jsonwebtoken';
import jwtOptions from '../config/jwtOptions';
import createDefaultGroup from '../util/createDefaultGroup';

export default async function authenticate(req, res, next) {
	if (req.authenticatedUser) {
		const config = req.authenticatedUser;
		let user = await UserModel.findOne({service: config.service, outerId: config.outerId});

		if (!user) {
			user = new UserModel(config);
		} else {
			user.name = config.name;
			user.image = config.image;
		}

		await user.save();

		req.session.auth = jwt.sign({ id: user._id }, jwtOptions.secret);

		await createDefaultGroup(user);

		return res.redirect('/');
	} else {
		next();
	}
};
