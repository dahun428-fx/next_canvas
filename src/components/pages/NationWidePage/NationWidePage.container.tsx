import React from 'react';
import { NationWidePage as Presenter } from './NationWidePage';
import { useSelector } from '@/store/hooks';
import { selectViolence } from '@/store/modules/common/violence';

type Props = {};

export const NationWidePage: React.FC<Props> = () => {
	const violenceResponse = useSelector(selectViolence);

	return <Presenter violenceResponse={violenceResponse} />;
};

NationWidePage.displayName = 'NationWidePage';
