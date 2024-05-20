import { digit, percentage } from '@/utils/number';
import { PoliceYearType, police_city } from '@/utils/openapi/police/data';
import {
	Card,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
} from '@mui/material';
import { useMemo } from 'react';

type Props = {
	nowYear: string;
	policeYearlyData: PoliceYearType[];
};
export const NationMainTable: React.FC<Props> = ({
	nowYear,
	policeYearlyData,
}) => {
	const cityLabels = [...police_city];

	const totalCountByYear = useMemo(() => {
		return policeYearlyData.filter(item => item.year === nowYear)[0].totalCount;
	}, [nowYear]);

	const chartDatas: { [key: string]: number } = useMemo(() => {
		const data = policeYearlyData.filter(item => item.year === nowYear);
		const map = new Map<string, number>();
		data.forEach(item => {
			item.data.forEach(childItems => {
				map.set(childItems.city, childItems.totalCount ?? 0);
			});
		});
		return Object.fromEntries(map);
	}, [policeYearlyData, nowYear]);

	return (
		<Card variant="outlined" sx={{ margin: 2, textAlign: 'center' }}>
			<TableContainer>
				<Table sx={{ minWidth: 700 }} aria-label="customized table">
					<TableHead>
						<TableRow>
							{cityLabels.map((item, index) => {
								return <TableCell key={index}>{item}</TableCell>;
							})}
						</TableRow>
					</TableHead>
					<TableBody>
						<TableRow>
							{cityLabels.map((item, index) => {
								const value = chartDatas[item];
								const digited = `${digit(value)}`;
								const percent = `${percentage(value, totalCountByYear)}`;
								const label = `${digited} ( ${percent} ) `;
								return (
									<TableCell key={index} component="th" scope="row">
										{digited}
									</TableCell>
								);
							})}
						</TableRow>
						<TableRow>
							{cityLabels.map((item, index) => {
								const value = chartDatas[item];
								const digited = `${digit(value)}`;
								const percent = `${percentage(value, totalCountByYear)}`;
								const label = `${digited} ( ${percent} ) `;
								return (
									<TableCell key={index} component="th" scope="row">
										{`${percent}`}
									</TableCell>
								);
							})}
						</TableRow>
					</TableBody>
				</Table>
			</TableContainer>
		</Card>
	);
};
NationMainTable.displayName = 'NationMainTable';
