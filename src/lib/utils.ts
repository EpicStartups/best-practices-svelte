import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { cubicOut } from 'svelte/easing';
import type { TransitionConfig } from 'svelte/transition';

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

type FlyAndScaleParams = {
	y?: number;
	x?: number;
	start?: number;
	duration?: number;
};

export const flyAndScale = (
	node: Element,
	params: FlyAndScaleParams = { y: -8, x: 0, start: 0.95, duration: 150 }
): TransitionConfig => {
	const style = getComputedStyle(node);
	const transform = style.transform === 'none' ? '' : style.transform;

	const scaleConversion = (valueA: number, scaleA: [number, number], scaleB: [number, number]) => {
		const [minA, maxA] = scaleA;
		const [minB, maxB] = scaleB;

		const percentage = (valueA - minA) / (maxA - minA);
		const valueB = percentage * (maxB - minB) + minB;

		return valueB;
	};

	const styleToString = (style: Record<string, number | string | undefined>): string => {
		return Object.keys(style).reduce((str, key) => {
			if (style[key] === undefined) return str;
			return str + `${key}:${style[key]};`;
		}, '');
	};

	return {
		duration: params.duration ?? 200,
		delay: 0,
		css: (t) => {
			const y = scaleConversion(t, [0, 1], [params.y ?? 5, 0]);
			const x = scaleConversion(t, [0, 1], [params.x ?? 0, 0]);
			const scale = scaleConversion(t, [0, 1], [params.start ?? 0.95, 1]);

			return styleToString({
				transform: `${transform} translate3d(${x}px, ${y}px, 0) scale(${scale})`,
				opacity: t
			});
		},
		easing: cubicOut
	};
};

// Time
const DIVISIONS = [
	{ amount: 60, name: 'seconds' },
	{ amount: 60, name: 'minutes' },
	{ amount: 24, name: 'hours' },
	{ amount: 7, name: 'days' },
	{ amount: 4.34524, name: 'weeks' },
	{ amount: 12, name: 'months' },
	{ amount: Number.POSITIVE_INFINITY, name: 'years' }
] as const;

const formatter = new Intl.RelativeTimeFormat(undefined, {
	numeric: 'auto'
});

export function formatTimeAgo(date: Date) {
	let duration = (date.getTime() - new Date().getTime()) / 1000;

	for (let i = 0; i <= DIVISIONS.length; i++) {
		const division = DIVISIONS[i];
		if (Math.abs(duration) < division.amount) {
			return formatter.format(Math.round(duration), division.name);
		}
		duration /= division.amount;
	}
}

/**
 * Handles a promise and returns a tuple with either the resolved data or an error.
 *
 * @template T The type of the data returned by the promise
 * @param {Promise<T>} promise The promise to handle
 * @returns {Promise<[T, undefined] | [undefined, Error]>} A promise that resolves to a tuple:
 *   - If the promise resolves successfully, returns [data, undefined]
 *   - If the promise rejects, returns [undefined, error]
 *
 * @example
 * const [data, error] = await handleFunc(fetchData());
 * if (error) {
 *   console.error('Error:', error);
 * } else {
 *   console.log('Data:', data);
 * }
 */
export async function handleFunc<T>(
	promise: Promise<T>
): Promise<[T, undefined] | [undefined, Error]> {
	try {
		const data = await promise;
		return [data, undefined];
	} catch (error) {
		return [undefined, error instanceof Error ? error : new Error(String(error))];
	}
}

/**
 * Fetches JSON data from a specified URL and returns it along with any potential errors.
 *
 * This function uses the Fetch API to make an HTTP request and parse the response as JSON.
 * It returns a tuple where the first element is the parsed data (or null if there was an error),
 * and the second element is an Error object (or null if the request was successful).
 *
 * @template T - The expected type of the JSON data to be returned.
 * @param {string} url - The URL to fetch the JSON data from.
 * @param {RequestInit} [options] - Optional configuration options for the fetch request.
 * @returns {Promise<[T | null, Error | null]>} A promise that resolves to a tuple:
 *   - If successful: [parsedData, null]
 *   - If an error occurs: [null, errorObject]
 *
 * @example
 * // Fetching user data
 * const [userData, error] = await fetchJSON<UserData>('https://api.example.com/user/1');
 * if (error) {
 *   console.error('Failed to fetch user data:', error);
 * } else {
 *   console.log('User data:', userData);
 * }
 */
export async function fetchJSON<T>(
	url: string,
	options?: RequestInit
): Promise<[T | null, Error | null]> {
	try {
		const response = await fetch(url, options);
		if (!response.ok) {
			throw new Error(`HTTP error! status: ${response.status}`);
		}
		const data = (await response.json()) as T;
		return [data, null];
	} catch (error) {
		return [null, error instanceof Error ? error : new Error(String(error))];
	}
}

/**
 * Extracts form data from a submit event and converts it to an object.
 *
 * @template T - The expected shape of the form data object.
 * @param {Event} event - The form submit event.
 * @returns {T} An object containing the form data, where keys are form field names and values are form field values.
 *
 * @example
 * // Assuming a form with fields 'name' and 'email'
 * const handleSubmit = (event: Event) => {
 *   event.preventDefault();
 *   const formData = extractFormDataClientSide<{ name: string, email: string }>(event);
 *   console.log(formData); // { name: 'John Doe', email: 'john@example.com' }
 * }
 */
export function extractFormDataClientSide<T extends Record<string, string | number | boolean>>(
	event: Event
): T {
	const form = event.target as HTMLFormElement;
	const formData = new FormData(form);
	const data = Array.from(formData.entries()).reduce<T>((acc, [key, value]) => {
		acc[key as keyof T] = value as T[keyof T];
		return acc;
	}, {} as T);

	return data;
}
