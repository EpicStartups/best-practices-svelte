<script lang="ts">
	import InputLabel from './InputLabel.svelte';
	import { TestModule } from './constructor.svelte';
	import { extractFormDataClientSide } from '$lib/utils';

	const { data } = $props();

	// variables
	let openModal: boolean = $state(false);
	let selectedFriendId: number = $state(0.0);

	let friendName: string = $state('');
	let friendAge: number = $state(0);

	// const mod = testModule();
	const mod = new TestModule(data.hobbies);

	let filteredFriends = $derived(mod.getFriends({ name: 'test1' }));
	let allFriends = $derived(mod.getAllFriends);

	// presentation state
	let isEditingFriendID = $state('');

	function handleAddFriend(event: Event) {
		let data = extractFormDataClientSide<{ name: string; age: number }>(event);
		mod.addFriends(data);
	}

	function handleAddHobby(event: Event) {
		let data = extractFormDataClientSide<{ name: string; skillLevel: number }>(event);
		mod.addHobbies(data);
	}

	function handleAddFamily(event: Event, friend_id: number) {
		let data = extractFormDataClientSide<{ friend_id: number; nick_name: string }>(event);
		// append friend_id to form data
		data.friend_id = friend_id;

		mod.addFamilyMembers(data);
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
		<button
			onclick={() => {
				openModal = true;
				selectedFriendId = friend.id;
				console.log('OPEN MODAL');
			}}>Open Modal</button
		>
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

{#if openModal}
	{@render familyModal(selectedFriendId)}
{/if}

{#snippet familyModal(friend_id)}
	<div class="modal">
		<div class="modal-content">
			FRIEND ID: {friend_id}
			<form
				onsubmit={(e: Event) => {
					e.preventDefault();
					handleAddFamily(e, friend_id);
				}}
			>
				<input type="text" name="nick_name" placeholder="Friend's family name" required />
				<button type="submit">Add Friend</button>
			</form>
			<h2>Modal Title</h2>
			<p>This is a simple modal content.</p>
			<button onclick={() => (openModal = false)}>Close</button>
		</div>
	</div>
{/snippet}

{JSON.stringify(mod.getAllFriends)}

<form
	onsubmit={(e: Event) => {
		e.preventDefault();
		handleAddFriend(e);
	}}
>
	<input type="text" name="name" placeholder="Friend's name" required />
	<input type="number" name="age" placeholder="Friend's age" required />
	<button type="submit">Add Friend</button>
</form>

<h1>Data from server</h1>
{JSON.stringify(mod.getHobbies)}

<form
	onsubmit={(e: Event) => {
		e.preventDefault();
		handleAddHobby(e);
	}}
>
	<input type="text" name="name" placeholder="Hobby name" required />
	<input type="number" name="skillLevel" placeholder="Hobby skill level" required />
	<button type="submit">Add Hobby</button>
</form>

<style>
	.modal {
		position: fixed;
		z-index: 1;
		left: 0;
		top: 0;
		width: 100%;
		height: 100%;
		overflow: auto;
		background-color: rgba(0, 0, 0, 0.4);
	}

	.modal-content {
		background-color: #fefefe;
		margin: 15% auto;
		padding: 20px;
		border: 1px solid #888;
		width: 80%;
	}
</style>
