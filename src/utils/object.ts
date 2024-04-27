/**
 * determine object type of value.
 * @param {unknown} value - value
 * @returns {boolean} if value is object, returns true, otherwise it returns false.
 */

import { MayBe } from './type';

export function isObject<T extends object = object>(
	value: unknown
): value is MayBe<T> {
	const type = typeof value;
	return value !== null && (type === 'object' || type === 'function');
}
