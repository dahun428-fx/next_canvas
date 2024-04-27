import { useSelector } from '@/store/hooks';
import { AreaFixPage as Presenter } from './AreaFixPage';
import { selectViolence } from '@/store/modules/common/violence';
import { selectRegion } from '@/store/modules/common/region';

type Props = {};

export const AreaFixPage: React.FC<Props> = () => {
	const violenceResponse = useSelector(selectViolence);
	const regionResponse = useSelector(selectRegion);

	return (
		<Presenter
			violenceResponse={violenceResponse}
			regionResponse={regionResponse}
		/>
	);
};

AreaFixPage.displayName = 'AreaFixPage';
