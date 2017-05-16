import config from '../../config/config';
import google from 'googleapis';
const OAuth2 = google.auth.OAuth2;

const oauth2Client = new OAuth2(
	config.googleClientId,
	config.googleClientSecret,
	`http://${config.host}:${config.devPort}/login/google`
);

const scopes = ['https://www.googleapis.com/auth/userinfo.profile'];

export const googleAuthURL = oauth2Client.generateAuthUrl({
	// access_type: 'offline',
	scope: scopes,
	response_type: 'code'
});

export async function handleLogin(req, res, next) {
	try {
		req.authenticatedUser = await new Promise((resolve, reject) => {
			oauth2Client.getToken(req.query.code, function (err, tokens) {
				if (err) {
					reject(err);
				}

				try {
					oauth2Client.setCredentials(tokens);

					google.oauth2('v2').userinfo.v2.me.get({auth: oauth2Client}, (err, profile) => {
						if (err) {
							reject(err);
						}

						resolve({
							service: 'google',
							outerId: profile.id,
							name: profile.name,
							image: profile.picture
						});
					});
				} catch (e) {
					reject(e);
				}
			});
		});

		// req.authenticatedUser = {
		// 	service: 'google',
		// 	outerId: '105600203489385681226',
		// 	name: 'Sergey Repkov',
		// 	image: 'https://lh3.googleusercontent.com/-XdUIqdMkCWA/AAAAAAAAAAI/AAAAAAAAAAA/4252rscbv5M/photo.jpg'
		// };

		next();
	} catch (e) {
		res.status(500).send(String(e)).end();
	}
}
