<script lang="ts">
	import InputLabel from './InputLabel.svelte';
	// import { testModule } from './test.svelte';
	import { TestModule } from './testClass.svelte';

	const { data } = $props();

	let friendName = $state('');
	let friendAge = $state(0);
	// const mod = testModule();
	const mod = new TestModule();
	let filteredFriends = $derived(mod.getFriends({ name: 'test1' }));
	let allFriends = $derived(mod.getAllFriends);

	// presentation state
	let isEditingFriendID = $state('');

	function handleAddFriend(event: Event) {
		const form = event.target as HTMLFormElement;
		const formData = new FormData(form);
		const data = Array.from(formData.entries()).reduce((acc, [key, value]) => {
			acc[key] = value;
			return acc;
		}, {});
		console.log(data);
		mod.addFriends(data);
	}
</script>

<h1>Playground</h1>
{mod.counterValue}
{mod.getMultiplier()}
<div style="border: 3px solid black;">
	{JSON.stringify(mod.counter2Value)}
</div>

<button onclick={() => mod.increment()}>Increment</button>

<input type="text" bind:value={friendName} />
<input type="text" bind:value={friendAge} />
<button onclick={() => mod.addFriends({ name: friendName, age: friendAge })}>Add Friend</button>

<h1>Filtered friends</h1>
{JSON.stringify(filteredFriends)}
<h1>All friends</h1>

{#each allFriends as friend}
	<div>
		<InputLabel
			onUpdate={(e) => mod.updateFriend(friend.id, { name: e.value })}
			value={friend.name}
		/>
		<InputLabel value={friend.age} />
		<input
			type="checkbox"
			onchange={(event) => mod.updateFriend(friend.id, { best: event.target.checked })}
			name=""
			id=""
		/>

		<div style="background-color: lightblue">
			{#if isEditingFriendID === friend.id}
				<input onblur={(e) => mod.updateFriend(friend.id, { name: e.target.value })} />
			{:else}
				<span ondblclick={() => (isEditingFriendID = friend.id)}>{friend.name}</span>
			{/if}
			<input
				type="checkbox"
				onchange={(event) => mod.updateFriend(friend.id, { best: event.target.checked })}
				name=""
				id=""
			/>
		</div>
		<div style="background-color: lightblue">
			{#if isEditingFriendID === friend.id}
				<input onblur={(e) => mod.updateFriend(friend.id, { name: e.target.value })} />
			{:else}
				<span ondblclick={() => (isEditingFriendID = friend.id)}>{friend.name}</span>
			{/if}
			<input
				type="checkbox"
				onchange={(event) => mod.updateFriend(friend.id, { best: event.target.checked })}
				name=""
				id=""
			/>
		</div>
	</div>
{/each}

{JSON.stringify(mod.getAllFriends)}

<form onsubmit={handleAddFriend}>
	<input type="text" name="name" placeholder="Friend's name" required />
	<input type="number" name="age" placeholder="Friend's age" required />
	<button type="submit">Add Friend</button>
</form>

<h1>Data from server</h1>
{JSON.stringify(data)}
