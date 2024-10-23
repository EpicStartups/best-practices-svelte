type ValidationResult = {
	isValid: boolean;
	error?: string;
	value?: string;
};

export function validateMessage(input: FormDataEntryValue | null): ValidationResult {
	let error: string | undefined;
	let value: string | undefined;

	if (input === null) {
		error = 'Message is required';
	} else if (typeof input !== 'string') {
		error = 'Message must be a string';
	} else {
		value = input.trim();
		if (value.length === 0) {
			error = 'Message cannot be empty';
		} else if (value.length > 1000) {
			error = 'Message is too long (max 1000 characters)';
		}
	}

	return {
		isValid: !error,
		error: error,
		value
	};
}
