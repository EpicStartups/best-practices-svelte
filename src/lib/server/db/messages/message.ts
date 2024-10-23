import db from '$lib/server/db/drizzle';
import { message, type Message } from '$lib/server/db/schema/app-schema';
import { user } from '$lib/server/db/schema/auth-schema';
import { eq, desc } from 'drizzle-orm';

export async function insertMessage(messageData: Omit<Message, 'id' | 'createdAt' | 'updatedAt'>) {
	const newMessage = {
		...messageData,
		id: crypto.randomUUID(),
		createdAt: new Date(),
		updatedAt: new Date()
	};
	const result = await db.insert(message).values(newMessage).returning();
	return result;
}

export async function getMessages() {
	return await db
		.select({
			message: {
				id: message.id,
				text: message.text,
				createdAt: message.createdAt,
				updatedAt: message.updatedAt
			},
			userName: user.name
		})
		.from(message)
		.innerJoin(user, eq(message.user_id, user.id))
		.orderBy(desc(message.createdAt));
}

export async function deleteMessage(id: string) {
	return await db.delete(message).where(eq(message.id, id));
}

export async function updateMessage(
	messageData: Omit<Message, 'user_id' | 'createdAt' | 'updatedAt'>
) {
	return await db
		.update(message)
		.set({
			...messageData,
			updatedAt: new Date()
		})
		.where(eq(message.id, messageData.id));
}
