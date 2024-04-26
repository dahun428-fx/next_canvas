import React from 'react';
import { NationWidePage as Presenter } from './NationWidePage';
import { useSelector } from '@/store/hooks';
import { selectViolence } from '@/store/modules/common/violence';
import { selectRegion } from '@/store/modules/common/region';

type Props = {};

export const NationWidePage: React.FC<Props> = () => {
	const violenceResponse = useSelector(selectViolence);
	const regionResponse = useSelector(selectRegion);

	return (
		<Presenter
			violenceResponse={violenceResponse}
			regionResponse={regionResponse}
		/>
	);
};

NationWidePage.displayName = 'NationWidePage';
