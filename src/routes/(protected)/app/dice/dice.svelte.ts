import type { DiceEntry } from '$lib/server/db/schema/app-schema';
import { handleFunc, fetchJSON } from '$lib/utils';

export class Dice {
	private counter: number = $state(0);
	private maxValue: number = $state(100);
	private userId: string;
	private entries: DiceEntry[] = $state([]);

	async loadEntries() {
		const [data, error] = await fetchJSON(`api/dice?user_id=${this.userId}`);
		if (error) {
			console.error('Error loading entries:', error);
			this.entries = [];
		} else {
			this.entries = data as DiceEntry[];
		}
	}

	constructor(user_id: string, maxValue?: number) {
		if (maxValue !== undefined) {
			this.maxValue = maxValue;
		}
		this.userId = user_id;
	}

	async roll() {
		const newValue = Math.floor(Math.random() * this.maxValue) + 1;
		const [data, error] = await fetchJSON<
			{
				id: string;
				value: number;
				user_id: string;
				createdAt: Date;
			}[]
		>(`api/dice?user_id=${this.userId}`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({ value: newValue })
		});
		if (error) {
			console.log('THERE WAS AN ERROR WHILE INSERTING DICE ENTRY: ', error);
		}

		if (data && data.length > 0) {
			this.entries.unshift(...data);
		}
		this.counter = newValue;
	}

	get value() {
		return this.counter;
	}

	get history() {
		return this.entries;
	}
}
