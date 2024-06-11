import { Container } from '@mui/material';
import { ViolentMain } from '../Violent/ViolentMain.container';
import { useDispatch } from 'react-redux';

type Props = {};

export const ViolentYearlyPage: React.FC<Props> = ({}) => {
	return (
		<Container>
			<ViolentMain />
		</Container>
	);
};

ViolentYearlyPage.displayName = 'ViolentYearly';
