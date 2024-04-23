import { RegionResourceYear } from '@/api/clients/services/open/region';
import { updateYearOperation } from '@/store/modules/common/region';
import { RegionItem } from '@/utils/openapi/region/region';
import { TabContext, TabList, TabPanel } from '@mui/lab';
import { Box, Tab } from '@mui/material';
import { SyntheticEvent, useCallback, useMemo, useState } from 'react';
import { useDispatch } from 'react-redux';
import { CrimeContent } from '../CrimeContent';

type Props = {
	selectedData: RegionItem;
};

export const CrimeTabList: React.FC<Props> = ({ selectedData }) => {
	const [tabValue, setTabValue] = useState(RegionResourceYear[0]);

	const dispatch = useDispatch();

	const regionYears = useMemo(() => {
		return RegionResourceYear;
	}, []);

	const tabChangeHandler = useCallback(
		(event: SyntheticEvent, value: string) => {
			setTabValue(value);
			updateYearOperation(dispatch)(value);
		},
		[dispatch, updateYearOperation, setTabValue]
	);

	console.log('selectedData ===> ', selectedData);

	return (
		<Box>
			<TabContext value={tabValue}>
				<Box>
					<TabList
						variant="scrollable"
						onChange={tabChangeHandler}
						// centered
					>
						{regionYears &&
							regionYears.length > 0 &&
							regionYears.map(item => {
								return (
									<Tab key={item} label={`${item}`} value={`${item}`}></Tab>
								);
							})}
					</TabList>
				</Box>
				{regionYears &&
					regionYears.length > 0 &&
					regionYears.map(item => {
						return (
							<TabPanel key={item} value={`${item}`}>
								<CrimeContent data={selectedData} />
								{/* {selectedData.city_name}
								{selectedData.totalCount} */}
							</TabPanel>
						);
					})}
			</TabContext>
		</Box>
	);
};
CrimeTabList.displayName = 'CrimeTabList';
