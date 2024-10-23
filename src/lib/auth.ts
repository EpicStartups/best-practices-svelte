import { betterAuth } from 'better-auth';
import {
	BETTER_AUTH_URL,
	BETTER_AUTH_TRUSTED_ORIGINS,
	BETTER_AUTH_SECRET,
	GOOGLE_CLIENT_SECRET,
	GOOGLE_CLIENT_ID
} from '$env/static/private';
import { drizzleAdapter } from 'better-auth/adapters/drizzle';
import db from '$lib/server/db/drizzle';
import { user, session, account, verification } from '$lib/server/db/schema/auth-schema';

export const auth = betterAuth({
	database: drizzleAdapter(db, {
		provider: 'pg',
		schema: {
			user: user,
			account: account,
			session: session,
			verification: verification
		}
	}),
	baseURL: BETTER_AUTH_URL,
	secret: BETTER_AUTH_SECRET,
	trustedOrigins: [BETTER_AUTH_TRUSTED_ORIGINS],
	emailAndPassword: {
		enabled: true
	},
	socialProviders: {
		google: {
			clientId: GOOGLE_CLIENT_ID,
			clientSecret: GOOGLE_CLIENT_SECRET
		}
	}
});

export type Auth = typeof auth;
