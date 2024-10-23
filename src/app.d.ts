// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
import type { Message, DiceEntry } from '$lib/server/db/schema/schema';

declare global {
	namespace App {
		// interface Error {}
		// interface PageData {}
		// interface PageState {}
		// interface Platform {}
		// Declare the types globally
		interface Message extends Message {}
		interface DiceEntry extends DiceEntry {}
	}
}

export {};
