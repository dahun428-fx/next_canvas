import { digit } from '@/utils/number';
import { policeCityArray } from '@/utils/openapi/police/police';
import { getComparator, stableSort } from '@/utils/sort';
import {
	Box,
	Paper,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TablePagination,
	TableRow,
	TableSortLabel,
	Toolbar,
	Tooltip,
	Typography,
} from '@mui/material';
import { visuallyHidden } from '@mui/utils';
import { useMemo, useState } from 'react';

type Props = {
	tableTitle: string;
	tableHeadData: string[];
	rows: any[];
};

type Order = 'asc' | 'desc';
interface HeadCell {
	disablePadding: boolean;
	id: string;
	label: string;
	numeric: boolean;
}

export const TableBasic: React.FC<Props> = ({
	tableTitle,
	tableHeadData,
	rows,
}) => {
	const [order, setOrder] = useState<Order>('desc');
	const [orderBy, setOrderBy] = useState<string>(tableHeadData[0]);
	const [page, setPage] = useState(0);
	const [rowsPerPage, setRowsPerPage] = useState(rows.length);

	const handleRequestSort = (
		event: React.MouseEvent<unknown>,
		property: string
	) => {
		const isAsc = orderBy === property && order === 'asc';
		setOrder(isAsc ? 'desc' : 'asc');
		setOrderBy(property);
	};

	const handleChangePage = (event: unknown, newPage: number) => {
		setPage(newPage);
	};

	const handleChangeRowsPerPage = (
		event: React.ChangeEvent<HTMLInputElement>
	) => {
		setRowsPerPage(parseInt(event.target.value, 10));
		setPage(0);
	};

	const emptyRows =
		page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

	const visibleRows = useMemo(
		() =>
			stableSort(rows, getComparator(order, orderBy)).slice(
				page * rowsPerPage,
				page * rowsPerPage + rowsPerPage
			),
		[order, orderBy, page, rowsPerPage, rows]
	);

	interface EnhancedTableProps {
		onRequestSort: (event: React.MouseEvent<unknown>, property: string) => void;
		order: Order;
		orderBy: string;
		rowCount: number;
	}

	const headCells: HeadCell[] = useMemo(() => {
		return tableHeadData.map(item => {
			return {
				id: item,
				label: item,
				numeric: true,
				disablePadding: true,
			};
		});
	}, [tableHeadData]);

	const EnhancedTableHead = (props: EnhancedTableProps) => {
		const { onRequestSort, order, orderBy, rowCount } = props;
		const createSortHandler =
			(property: string) => (event: React.MouseEvent<unknown>) => {
				onRequestSort(event, property);
			};

		return (
			<TableHead>
				<TableRow>
					<TableCell>지역</TableCell>
					{headCells.map(headCell => (
						<TableCell
							key={headCell.id}
							align={headCell.numeric ? 'right' : 'left'}
							padding={headCell.disablePadding ? 'none' : 'normal'}
							sortDirection={orderBy === headCell.id ? order : false}
						>
							<TableSortLabel
								active={orderBy === headCell.id}
								direction={orderBy === headCell.id ? order : 'asc'}
								onClick={createSortHandler(headCell.id)}
							>
								{headCell.label}
								{orderBy === headCell.id ? (
									<Box component="span" sx={visuallyHidden}>
										{order === 'desc'
											? 'sorted descending'
											: 'sorted ascending'}
									</Box>
								) : null}
							</TableSortLabel>
						</TableCell>
					))}
				</TableRow>
			</TableHead>
		);
	};

	const EnhancedTableToolbar = ({ tableTitle }: { tableTitle: string }) => {
		return (
			<Toolbar
				sx={{
					pl: { sm: 2 },
					pr: { xs: 1, sm: 1 },
				}}
			>
				<Typography
					sx={{ flex: '1 1 100%', textAlign: 'center' }}
					variant="h6"
					id="tableTitle"
					component="div"
				>
					{tableTitle}
				</Typography>
			</Toolbar>
		);
	};

	const rowsTotalResult: number[] = useMemo(() => {
		let array: number[] = [];

		tableHeadData.map((year, yearIndex) => {
			let count = 0;
			visibleRows.map((row, rowIndex) => {
				const value = Number(row[year]);
				count += value;
			});
			array[yearIndex] = count;
		});
		return array;
	}, [visibleRows, tableHeadData]);

	return (
		<Box sx={{ width: '100%', marginTop: 2 }}>
			<Paper sx={{ width: '100%', mb: 2, border: '1px solid #ddd' }}>
				<EnhancedTableToolbar tableTitle={tableTitle} />
				<TableContainer>
					<Table
						sx={{ minWidth: 750, width: '90%', margin: '0 auto' }}
						aria-labelledby="tableTitle"
						size={'medium'}
					>
						<EnhancedTableHead
							order={order}
							orderBy={orderBy}
							onRequestSort={handleRequestSort}
							rowCount={rows.length}
						/>
						<TableBody>
							{visibleRows.map((row, index) => {
								const labelId = `enhanced-table-${index}`;

								return (
									<TableRow hover tabIndex={-1} key={`${labelId}_${row.city}`}>
										<TableCell
											component="th"
											id={`${row.city}_${index}`}
											scope="row"
											padding="none"
										>
											{row.city}
										</TableCell>
										{tableHeadData.map((year, yearIndex) => {
											const value = Number(row[year]);

											return (
												<TableCell
													key={`${row.city}_${year}_${yearIndex}`}
													align="right"
												>
													{digit(value)}
												</TableCell>
											);
										})}
									</TableRow>
								);
							})}
							{rowsTotalResult && rowsTotalResult.length > 0 && (
								<TableRow
									hover
									tabIndex={-1}
									sx={{ borderTop: '3px solid black' }}
								>
									<TableCell component="th" scope="row" padding="none">
										총계
									</TableCell>
									{rowsTotalResult.map((result, index) => {
										return (
											<TableCell key={`total_${index}_by_year`} align="right">
												{digit(result)}
											</TableCell>
										);
									})}
								</TableRow>
							)}
						</TableBody>
					</Table>
				</TableContainer>
				{/* <TablePagination rowsPerPageOptions={[5, 10, 25]} component="div" count={rows.length} rowsPerPage={rowsPerPage} page={page} onPageChange={handleChangePage} onRowsPerPageChange={handleChangeRowsPerPage} /> */}
			</Paper>
		</Box>
	);
};
TableBasic.displayName = 'TableBasic';
