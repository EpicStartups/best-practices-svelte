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
		.innerJoin(user, eq(message.user_id, user.id));
}

export async function deleteMessage(id: string) {
	return await db.delete(message).where(eq(message.id, id));
}

export async function updateMessage(
	messageData: Omit<Message, 'user_id' | 'createdAt' | 'updatedAt'>
) {
	return await db.update(message).set(messageData).where(eq(message.id, messageData.id));
}
