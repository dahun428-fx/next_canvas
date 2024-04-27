import { Box, LinearProgress, Skeleton } from '@mui/material';

export default function Loading() {
	// You can add any UI inside Loading, including a Skeleton.
	// return <LoadingSkeleton />
	// return <Skeleton />;
	return (
		<Box sx={{ width: '100%' }}>
			<LinearProgress />
		</Box>
	);
}
