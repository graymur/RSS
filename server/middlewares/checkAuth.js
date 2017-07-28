import {UserModel} from '../models/user';
import jwt from 'jsonwebtoken';
import jwtOptions from '../config/jwtOptions';

export default async function checkAuth(req, res, next) {
	if (['/login', '/login/google'].includes(req.originalUrl)) {
		return next();
	}

	try {
		if (!req.session.auth) {
			throw new Error('Not authorized');
		}

		const data = jwt.verify(req.session.auth, jwtOptions.secret);

		if (!data.id) {
			throw new Error('Bad auth token');
		}

		const user = await UserModel.findOne({_id: data.id});

		if (!user) {
			throw new Error('User not found');
		}

		req.user = user;

		next();
	} catch (e) {
		if (req.xhr) {
			res.status(401).send(String(e));
		} else {
			res.redirect('/login');
		}
	}
}
