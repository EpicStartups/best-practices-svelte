import { getFriendsFiltered } from './utils';

export function testModule() {
	let counter = $state(0);

	let friends = $state([
		{
			id: Math.random(),
			name: 'test1',
			age: 23,
			best: false
		}
	]);

	let counter2 = $derived({
		val: counter * 10,
		friends: [
			{
				nestedVal: counter * 10
			}
		]
	});

	function increment() {
		counter += 1;
	}

	function getMultiplier() {
		return counter * 2;
	}

	function addFriends({ name, age }) {
		console.log('Add friends');
		friends.push({ id: Math.random(), name, age, best: false });
	}

	function updateFriend(id, payload) {
		console.log('payload: ', payload);
		friends = friends.map((friend) => {
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

	return {
		increment,
		get counterValue() {
			return counter;
		},
		get counter2Value() {
			return counter2;
		},
		getMultiplier,
		addFriends,
		getFriends(payload) {
			return getFriendsFiltered(friends, { name: payload.name, age: payload.age });
		},
		get getAllFriends() {
			return friends;
		},
		updateFriend
	};
}
