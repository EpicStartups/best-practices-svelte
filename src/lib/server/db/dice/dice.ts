import db from '$lib/server/db/drizzle';
import { diceEntries, type DiceEntry } from '$lib/server/db/schema/app-schema';
import { user } from '$lib/server/db/schema/auth-schema';
import { eq, desc } from 'drizzle-orm';

export async function insertDiceEntry(diceData: Omit<DiceEntry, 'id' | 'createdAt'>) {
	const newDiceEntry = {
		...diceData,
		id: crypto.randomUUID(),
		createdAt: new Date()
	};
	const diceEntry = await db.insert(diceEntries).values(newDiceEntry).returning();

	return diceEntry;
}

export async function getDiceEntries(user_id: string) {
	return await db
		.select()
		.from(diceEntries)
		.where(eq(diceEntries.user_id, user_id))
		.orderBy(desc(diceEntries.createdAt));
}

export async function deleteDiceEntry(dice_id: string) {
	return await db.delete(diceEntries).where(eq(diceEntries.id, dice_id));
}
