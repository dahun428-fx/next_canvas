import {
	Container,
	FormControl,
	InputLabel,
	MenuItem,
	Select,
	SelectChangeEvent,
	Typography,
} from '@mui/material';
import { PoliceMain } from '../Police';
import { Police } from '@/models/api/open/police/SearchPoliceResponse';
import { PoliceResourceYears } from '@/api/clients/services/open/police';
import { LoadingBar } from '@/components/common/Loading/LoadingBar';
import { PoliceMainSkeleton } from '../Police/PoliceMain.Skeleton';

type Props = {
	nowYear: string;
	policeDatas: Police[];
	setNowYear: (event: SelectChangeEvent) => void;
	hasItems: boolean;
};

export const ViolentCimePage: React.FC<Props> = ({
	nowYear,
	setNowYear,
	policeDatas,
	hasItems,
}) => {
	const policeYears = [...PoliceResourceYears].reverse();
	return (
		<Container maxWidth="xl">
			<Typography variant="h4" sx={{ mb: 5 }}>
				경찰청 전국 경찰서별 강력범죄 발생 현황
				{nowYear && ` ( ${nowYear} )`}
			</Typography>
			<FormControl sx={{ m: 1, minWidth: 120 }} size="small">
				<InputLabel id="demo-select-small-label">연도</InputLabel>
				<Select
					labelId="demo-select-small-label"
					id="demo-select-small"
					value={nowYear}
					label="연도"
					onChange={setNowYear}
				>
					{policeYears &&
						policeYears.length > 0 &&
						policeYears.map((item, index) => {
							return (
								<MenuItem key={`year_${item}`} value={`${item}`}>
									{item}
								</MenuItem>
							);
						})}
				</Select>
			</FormControl>
			{!hasItems ? (
				<>
					<PoliceMain policeDatas={policeDatas} />
				</>
			) : (
				<>
					{/* <LoadingBar /> */}
					<PoliceMainSkeleton />
				</>
			)}
		</Container>
	);
};

ViolentCimePage.displayName = 'ViolentCimePage';
