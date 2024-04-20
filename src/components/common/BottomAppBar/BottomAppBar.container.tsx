import { useSelector } from '@/store/hooks';
import { BottomAppBar as Presenter } from './BottomAppBar';
import {
	bottomBarShowOpertion,
	selectBottomShowState,
} from '@/store/modules/common/bottom';
import { useDispatch } from 'react-redux';

type Props = {};

export const BottomAppBar: React.FC<Props> = () => {
	const dispatch = useDispatch();
	const showState = useSelector(selectBottomShowState);

	const handleToggle = () => {
		bottomBarShowOpertion(dispatch)(!showState);
	};

	return <Presenter handleToggle={handleToggle} showState={showState} />;
};

BottomAppBar.displayName = 'BottomAppBar';
