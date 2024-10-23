// drizzle.config.ts
import type { Config } from 'drizzle-kit';
import * as dotenv from 'dotenv';
dotenv.config();
const { DATABASE_URL } = process.env;
if (!DATABASE_URL) {
	throw new Error('No url');
}
export default {
	schema: './src/lib/server/db/schema/schema.ts',
	out: './src/lib/server/db/migrations',
	dialect: 'postgresql',
	dbCredentials: {
		url: DATABASE_URL
	}
} satisfies Config;
