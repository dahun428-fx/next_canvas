import { Container } from '@mui/material';
import { PoliceMain } from '../Police';

type Props = {};

export const ViolentCimePage: React.FC<Props> = () => {
	return (
		<Container maxWidth="xl">
			<PoliceMain />
		</Container>
	);
};

ViolentCimePage.displayName = 'ViolentCimePage';
