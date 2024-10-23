export interface Friend {
	name: string;
	age: number;
}

export interface FilterCriteria {
	name?: string;
	age?: number;
	[key: string]: any; // Allow for additional filter criteria
}

export function getFriendsFiltered<T extends Friend>(friends: T[], criteria: FilterCriteria): T[] {
	return friends.filter((friend) => {
		return Object.entries(criteria).every(([key, value]) => {
			if (value === undefined) return true; // Skip undefined criteria
			return friend[key] === value;
		});
	});
}
