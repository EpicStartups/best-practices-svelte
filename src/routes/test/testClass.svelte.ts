import { getFriendsFiltered } from './utils';

export class TestModule {
	private counter = $state(0);
	private friends = $state([
		{
			id: Math.random(),
			name: 'test1',
			age: 23,
			best: false
		}
	]);

	private counter2 = $derived({
		val: this.counter * 10,
		friends: [
			{
				nestedVal: this.counter * 10
			}
		]
	});

	constructor() {}

	increment() {
		this.counter += 1;
	}

	getMultiplier() {
		return this.counter * 2;
	}

	addFriends({ name, age }) {
		console.log('Add friends');
		this.friends.push({ id: Math.random(), name, age, best: false });
	}

	updateFriend(id, payload) {
		console.log('payload: ', payload, 'id: ', id);
		this.friends = this.friends.map((friend) => {
			if (friend.id === id) {
				return {
					...friend,
					...(payload.name !== undefined && { name: payload.name }),
					...(payload.age !== undefined && { age: payload.age }),
					...(payload.best !== undefined && { best: payload.best })
				};
			}
			return friend;
		});
	}

	getFriends(payload) {
		return getFriendsFiltered(this.friends, { name: payload.name, age: payload.age });
	}

	get getAllFriends() {
		return this.friends;
	}

	get counterValue() {
		return this.counter;
	}

	get counter2Value() {
		return this.counter2;
	}
}
