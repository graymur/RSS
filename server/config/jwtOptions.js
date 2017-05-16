import passportJWT from 'passport-jwt';

const jwtOptions = {
	jwtFromRequest: passportJWT.ExtractJwt.fromAuthHeader(),
	secret: 'someSecretString'
};

export default jwtOptions;
