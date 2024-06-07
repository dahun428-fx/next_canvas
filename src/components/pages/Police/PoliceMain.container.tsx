import { PoliceMain as Presenter } from './PoliceMain';
import { Police } from '@/models/api/open/police/SearchPoliceResponse';

type Props = {
	policeDatas: Police[];
};

export const PoliceMain: React.FC<Props> = ({ policeDatas }) => {
	return <Presenter policeDatas={policeDatas} />;
};

PoliceMain.displayName = 'PoliceMain';
