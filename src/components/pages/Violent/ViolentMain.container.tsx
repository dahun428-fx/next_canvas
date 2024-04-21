import { useSelector } from '@/store/hooks';
import { ViolentMain as Presenter } from './ViolentMain';
import { selectViolence } from '@/store/modules/common/violence';

type Props = {};

export const ViolentMain: React.FC<Props> = () => {
	const violenceResponse = useSelector(selectViolence);

	return <Presenter violenceResponse={violenceResponse} />;
};

ViolentMain.displayName = 'ViolentMain';
