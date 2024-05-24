import { Meta, StoryObj } from '@storybook/react';
import { CustomCard } from './CustomCard';
import { Box, Skeleton } from '@mui/material';
import { SkeletonCustomCard } from './SkeletonCustomCard';

const meta = {
	component: CustomCard,
} satisfies Meta<typeof CustomCard>;
export default meta;
type Story = StoryObj<typeof meta>;

export const _SkeletonCustomCard = () => {
	return <SkeletonCustomCard />;
};
export const _CustomCard: Story = {
	args: {
		type: 'total',
		year: '2022',
		// crimeData: { '서울:살인': 10000 },
		crimeData: { 서울: 10000 },
		highestCity: '서울',
		highestCrime: {
			count: 10000,
			crime: '살인',
		},
		highestYearData: { 서울: 10000 },
		lowestCity: '서울',
		lowestCrime: {
			count: 10000,
			crime: '살인',
		},
		lowestYearData: { 서울: 10000 },
		office: {
			강도: 10000,
			경찰서: '서울경찰서',
			발생년도: 2022,
			살인: 10000,
			절도: 10000,
			폭력: 10000,
			city: '서울',
			발생연도: 2022,
		},
		selectedCity: '서울',
		totalCrimeCount: 10000,
	},
};
