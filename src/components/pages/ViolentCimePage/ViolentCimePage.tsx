import { Container } from '@mui/material';
import { PoliceMain } from '../Police';
import { BottomNavi } from '@/components/common/BottomNavi';
import { useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { loadOperation } from '@/store/modules/common/police';

type Props = {};

export const ViolentCimePage: React.FC<Props> = () => {
	const initailized = useRef(false);

	const dispatch = useDispatch();

	useEffect(() => {
		if (!initailized.current) {
			loadOperation(dispatch)();
			initailized.current = true;
		}
	}, [dispatch, initailized.current]);

	return (
		<Container maxWidth="xl">
			<PoliceMain />
			<BottomNavi />
		</Container>
	);
};

ViolentCimePage.displayName = 'ViolentCimePage';
