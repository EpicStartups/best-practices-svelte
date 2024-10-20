<script lang="ts">
	interface EditableFieldProps<T> {
		value: T;
		onUpdate: (newValue: T) => void;
		onStartEdit: () => void;
		onCancelEdit: () => void;
		inputType?: string;
		displayComponent?: (value: T) => string;
	}

	let { id, value, onUpdate, onStartEdit, onCancelEdit, inputType = 'text' } = $props();

	let isEditing = $state(false);

	function handleBlur(event: Event) {
		const target = event.target as HTMLInputElement;
		onUpdate(inputType === 'checkbox' ? target.checked : { value: target.value });
	}

	function handleKeyDown(event: KeyboardEvent) {
		if (event.key === 'Enter') {
			handleBlur(event);
		} else if (event.key === 'Escape') {
			onCancelEdit();
		}
	}
</script>

<div>
	{#if isEditing}
		<input
			type={inputType}
			value={inputType !== 'checkbox' ? value : undefined}
			checked={inputType === 'checkbox' ? value : undefined}
			onblur={handleBlur}
			onkeydown={handleKeyDown}
		/>
	{:else}
		<span ondblclick={() => (isEditing = true)}>{value}</span>
	{/if}
</div>

<style>
	div {
		display: inline-block;
	}
	span {
		cursor: pointer;
		padding: 2px 4px;
	}
	span:hover {
		background-color: #f0f0f0;
	}
	input {
		font-size: 1em;
		padding: 2px 4px;
	}
</style>
