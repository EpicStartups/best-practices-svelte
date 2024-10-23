<script>
	import '../../../app.css';
	let { children } = $props();
	import Navbar from '$lib/components/custom/Navbar.svelte';

	const routes = [
		{
			path: '/app/',
			label: 'Home'
		},
		{
			path: '/app/messages',
			label: 'Messages'
		},
		{
			path: '/app/friends',
			label: 'Friends'
		},
		{
			path: '/app/dice',
			label: 'Dice'
		}
	];
</script>

<Navbar {routes} />
{@render children()}
