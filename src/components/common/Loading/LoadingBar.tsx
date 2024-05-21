import { Box } from '@mui/material';
import { useEffect, useState } from 'react';
import LinearProgress from '@mui/material/LinearProgress';

type Props = {};
export const LoadingBar: React.FC<Props> = () => {
	return (
		<Box sx={{ width: '100%' }}>
			<LinearProgress />
		</Box>
	);
};
