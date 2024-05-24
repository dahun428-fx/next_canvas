import { Box, Skeleton } from '@mui/material';
import React from 'react';

type Props = {};
export const SkeletonCustomCard: React.FC<Props> = () => {
	return (
		<Box sx={{ maxWidth: 400, minWidth: 200, margin: 1 }}>
			<Skeleton variant="rectangular" height={200} />
		</Box>
	);
};

SkeletonCustomCard.displayName = 'SkeletonCustomCard';
