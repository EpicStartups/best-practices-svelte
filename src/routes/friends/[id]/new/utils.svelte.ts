export interface DataModule {
	name: string;
	hobbies: Hobby[];
}

interface Hobby {
	name: string;
}

export class InitData {
	private localDataModule = $state<DataModule>({
		name: '',
		hobbies: []
	});

	constructor(dataModule: DataModule) {
		this.localDataModule = dataModule;
	}

	get values() {
		return this.localDataModule;
	}

	updateName(name: string) {
		this.localDataModule.name = name;
	}

	updateHobbies(hobbies: Hobby[]) {
		this.localDataModule.hobbies = hobbies;
	}
}
