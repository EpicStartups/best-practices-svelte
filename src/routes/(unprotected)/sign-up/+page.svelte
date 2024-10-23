<script lang="ts">
	import { Button } from '$lib/components/ui/button/index.js';
	import * as Card from '$lib/components/ui/card/index.js';
	import { Input } from '$lib/components/ui/input/index.js';
	import { Label } from '$lib/components/ui/label/index.js';
	import { signUp } from '$lib/auth-client';

	type userSignUp = {
		firstName: string;
		lastName: string;
		email: string;
		password: string;
	};

	let firstName = $state('');
	let lastName = $state('');
	let email = $state('');
	let password = $state('');

	// Function to handle form submission
	const handleSignUp = async (user: userSignUp) => {
		await signUp.email({
			email: user.email,
			password: user.password,
			name: `${user.firstName} ${user.lastName}`,
			callbackURL: '/app',
			fetchOptions: {
				onError(context) {
					alert(context.error.message);
				}
			}
		});
	};
</script>

<div class="flex min-h-screen flex-col items-center justify-center px-6 py-12 sm:px-0">
	<Card.Root class="mx-auto max-w-sm">
		<Card.Header>
			<Card.Title class="text-xl">Sign Up</Card.Title>
			<Card.Description>Enter your information to create an account</Card.Description>
		</Card.Header>
		<Card.Content>
			<div class="grid gap-4">
				<div class="grid grid-cols-2 gap-4">
					<div class="grid gap-2">
						<Label for="first-name">First name</Label>
						<Input id="first-name" placeholder="Max" required bind:value={firstName} />
					</div>
					<div class="grid gap-2">
						<Label for="last-name">Last name</Label>
						<Input id="last-name" placeholder="Robinson" required bind:value={lastName} />
					</div>
				</div>
				<div class="grid gap-2">
					<Label for="email">Email</Label>
					<Input id="email" type="email" placeholder="m@example.com" required bind:value={email} />
				</div>
				<div class="grid gap-2">
					<Label for="password">Password</Label>
					<Input id="password" type="password" bind:value={password} />
				</div>
				<Button
					type="button"
					class="w-full"
					onclick={() => handleSignUp({ firstName, lastName, email, password })}
					>Create an account</Button
				>
			</div>
			<div class="mt-4 text-center text-sm">
				Already have an account?
				<a href="/sign-in" class="underline"> Sign in </a>
			</div>
		</Card.Content>
	</Card.Root>
</div>
