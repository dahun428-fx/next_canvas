import { RegionResourceYear } from '@/api/clients/services/open/region';
import { MenuItem, Select, SelectChangeEvent, Typography } from '@mui/material';

type Props = {
	nowYear: string;
	setNowYear: (value: string) => void;
};

export const NationTitle: React.FC<Props> = ({ nowYear, setNowYear }) => {
	const resourceYear = [...RegionResourceYear].reverse();

	return (
		<Typography variant="h6">
			<Select
				variant="standard"
				value={nowYear}
				defaultValue={nowYear}
				sx={{ height: '30px', width: '12ch', textAlign: 'right' }}
				onChange={(event: SelectChangeEvent) => {
					setNowYear(event.target.value as string);
				}}
			>
				{resourceYear.map(item => {
					return (
						<MenuItem key={item} value={item}>
							{item}
						</MenuItem>
					);
				})}
			</Select>
			년도 범죄 발생현황
		</Typography>
	);
};

NationTitle.displayName = 'NationTitle';
