import { SkeletonCustomCard } from '@/components/ui/card/SkeletonCustomCard';
import { Grid } from '@mui/material';

type Props = {
	count: number;
};

export const NationCardListSkeleton: React.FC<Props> = ({ count }) => {
	return (
		<Grid container>
			{Array.from(Array(count).keys()).map((ele, index) => {
				return (
					<Grid key={index} item xs={12} md={4} sm={4}>
						<SkeletonCustomCard />
					</Grid>
				);
			})}
		</Grid>
	);
};
