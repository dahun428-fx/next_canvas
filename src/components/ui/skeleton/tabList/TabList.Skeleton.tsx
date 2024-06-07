import { Skeleton } from '@mui/material';

export const TabListSkeleton: React.FC = () => {
	return (
		<div>
			<Skeleton
				variant="rounded"
				sx={{
					height: '60px',
				}}
			/>
		</div>
	);
};

TabListSkeleton.displayName = 'TabListSkeleton';
