import { useCallback, useState } from 'react';

export function useBoolState(initial = false) {
	const [bool, SetBool] = useState(initial);
	const setTrue = useCallback(() => SetBool(true), []);
	const setFalse = useCallback(() => SetBool(false), []);
	const toogle = useCallback(() => SetBool(p => !p), []);
	return Object.assign(
		[bool, setTrue, setFalse, toogle] as const,
		{ bool, setTrue, setFalse, toogle } as const
	);
}
