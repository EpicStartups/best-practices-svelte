import { pgTable, integer, text, timestamp } from 'drizzle-orm/pg-core';
import { user } from './auth-schema';

export const message = pgTable('message', {
	id: text('id').primaryKey(),
	user_id: text('user_id')
		.references(() => user.id)
		.notNull(),
	text: text('text').notNull(),
	createdAt: timestamp('createdAt').notNull(),
	updatedAt: timestamp('updatedAt').notNull()
});

export const diceEntries = pgTable('dice_entries', {
	id: text('id').primaryKey(),
	user_id: text('user_id')
		.references(() => user.id)
		.notNull(),
	value: integer('value').notNull(),
	createdAt: timestamp('createdAt').notNull()
});

export type DiceEntry = typeof diceEntries.$inferSelect;
export type Message = typeof message.$inferInsert;
