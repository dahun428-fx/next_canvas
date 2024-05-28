import { RegionResourceYear } from '@/api/clients/services/open/region';
import { MultiChartDataType } from '@/components/ui/chart/CustomChart';
import { digit } from '@/utils/number';
import {
	Card,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
} from '@mui/material';
import React from 'react';

type Props = {
	datasForMurderAndRobber: MultiChartDataType[];
	datasForViolenceAndStolen: MultiChartDataType[];
	datasForTotal: MultiChartDataType[];
};

export const AreaFixTable: React.FC<Props> = ({
	datasForMurderAndRobber,
	datasForViolenceAndStolen,
	datasForTotal,
}) => {
	const dataYears = [...RegionResourceYear];

	return (
		<Card variant="outlined" sx={{ margin: 2, textAlign: 'center' }}>
			<TableContainer>
				<Table sx={{ minWidth: 700 }} aria-label="customized table">
					<TableHead>
						<TableRow>
							<TableCell></TableCell>
							{dataYears.map((item, index) => {
								return <TableCell key={`${index}_${item}`}>{item}</TableCell>;
							})}
						</TableRow>
					</TableHead>
					<TableBody>
						{datasForMurderAndRobber.map((item, index) => {
							const data = item.data;
							return (
								<TableRow key={index}>
									<TableCell>{item.label}</TableCell>
									{data.map((_data, _index) => {
										return (
											<TableCell key={`${index}_${index}_${_index}`}>
												{digit(_data)}
											</TableCell>
										);
									})}
								</TableRow>
							);
						})}
						{datasForViolenceAndStolen.map((item, index) => {
							const data = item.data;
							return (
								<TableRow key={index}>
									<TableCell>{item.label}</TableCell>
									{data.map((_data, _index) => {
										return (
											<TableCell key={`${index}_${index}_${_index}`}>
												{digit(_data)}
											</TableCell>
										);
									})}
								</TableRow>
							);
						})}
						{datasForTotal.map((item, index) => {
							const data = item.data;
							return (
								<TableRow key={index}>
									<TableCell>{item.label}</TableCell>
									{data.map((_data, _index) => {
										return (
											<TableCell key={`${index}_${index}_${_index}`}>
												{digit(_data)}
											</TableCell>
										);
									})}
								</TableRow>
							);
						})}
					</TableBody>
				</Table>
			</TableContainer>
		</Card>
	);
};
AreaFixTable.displayName = 'AreaFixTable';
