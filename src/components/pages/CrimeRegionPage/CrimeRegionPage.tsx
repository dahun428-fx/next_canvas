import { Box, Grid } from '@mui/material';
import { CrimeMain } from '../Crime';

type Props = {};

export const CrimeRegionPage: React.FC<Props> = () => {
	return (
		<Box>
			<CrimeMain />
		</Box>
	);
};

CrimeRegionPage.displayName = 'CrimeRegionPage';
