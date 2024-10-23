import db from '$lib/server/db/drizzle';
import { message } from '$lib/server/db/schema/app-schema';
import { user } from '$lib/server/db/schema/auth-schema';
import { eq } from 'drizzle-orm';

type Message = typeof message.$inferInsert;

export async function insertMessage(messageData: Omit<Message, 'id' | 'createdAt' | 'updatedAt'>) {
	return await db.insert(message).values({
		...messageData,
		id: crypto.randomUUID(),
		createdAt: new Date(),
		updatedAt: new Date()
	});
}
export async function getMessages() {
	return await db
		.select({
			message: {
				id: message.id,
				text: message.text,
				createdAt: message.createdAt
			},
			userName: user.name
		})
		.from(message)
		.leftJoin(user, eq(message.user_id, user.id));
}
