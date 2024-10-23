export interface Family {
	nick_name: string;
	// sports: string[];
}

export interface Friend {
	id: number;
	name: string;
	age: number;
	best: boolean;
	family?: Family[];
}

export interface FilterCriteria {
	name?: string;
	age?: number;
}
