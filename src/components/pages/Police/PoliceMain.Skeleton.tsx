import { TabListSkeleton } from '@/components/ui/skeleton/tabList/TabList.Skeleton';
import { Box, Skeleton } from '@mui/material';

export const PoliceMainSkeleton: React.FC = () => {
	return (
		<>
			<Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
				<TabListSkeleton />
			</Box>
		</>
	);
};

PoliceMainSkeleton.displayName = 'PoliceMainSkeleton';
