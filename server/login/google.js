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

export const handleLogin = (req, res) => {
	return new Promise((resolve, reject) => {
		oauth2Client.getToken(req.query.code, function (err, tokens) {
			if (err) {
				reject(err);
			}

			oauth2Client.setCredentials(tokens);

			google.oauth2('v2').userinfo.v2.me.get({auth: oauth2Client}, (err, profile) => {
				if (err) {
					reject(err);
				}

				resolve({
					provider: 'google',
					id: profile.id,
					name: profile.name,
					image: profile.picture
				});
			});
		});
	});
}
