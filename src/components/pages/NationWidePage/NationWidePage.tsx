import { PoliceYear } from '@/utils/openapi/police/police';
import { Box, Divider, SelectChangeEvent, Stack } from '@mui/material';
import React, { useState } from 'react';
import { RegionResponse } from '@/store/modules/common/region';
import { SearchPoliceReseponse } from '@/models/api/open/police/SearchPoliceResponse';
import { NationTitle } from './NationTitle';
import {
	PoliceCityMergedType,
	PoliceYearRange,
	PoliceYearType,
} from '@/utils/openapi/police/data';
import { NationCardList } from './NationCardList';
import { NationMainChart } from './NationMainChart';
import { NationMainTable } from './NationMainTable';
import { NationChartList } from './NationChatList';

type Props = {
	nowYear: string;
	violenceItems: SearchPoliceReseponse[];
	regionItems: RegionResponse[];
	// policeTotalData: PoliceCityMergedType[];
	policeYearlyData: PoliceYearType[];
	setNowYear: (event: SelectChangeEvent) => void;
};

export const NationWidePage: React.FC<Props> = ({
	nowYear,
	regionItems,
	violenceItems,
	// policeTotalData,
	policeYearlyData,
	setNowYear,
}) => {
	const [selectedCity, setSelectedCity] = useState('서울');

	if (violenceItems.length < 1) {
		return null;
	}

	/*
        1. 2022 년도 총 범죄 건수
        2. 최다범죄발생지 / 최저범죄발생지
        3. 최다범죄 - 대분류 / - 중분류
           최저범죄 - 대분류 / - 중분류
        4. 2022 년도 살인 건수
        5. 가장 바쁜 경찰서
        6. 범죄 종류별 발생 건수
    */
	return (
		<Box>
			<Stack spacing={2}>
				<Box sx={{ padding: 1, margin: 1 }}>
					<NationTitle nowYear={nowYear} setNowYear={setNowYear} />
				</Box>
				<Divider />
				<NationCardList
					{...{
						nowYear,
						policeYearlyData,
						violenceItems,
						regionItems,
					}}
				/>
				<Stack>
					<NationMainChart
						{...{
							nowYear,
							policeYearlyData,
						}}
					/>
					<NationMainTable
						{...{
							nowYear,
							policeYearlyData,
						}}
					/>
					<NationChartList
						{...{
							nowYear,
							policeYearlyData,
						}}
					/>
				</Stack>
			</Stack>
		</Box>
	);
};

NationWidePage.displayName = 'NationWidePage';
