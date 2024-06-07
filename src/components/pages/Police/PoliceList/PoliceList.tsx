import { Doughnut } from '@/components/ui/charts/doughnut';
import { Police } from '@/models/api/open/police/SearchPoliceResponse';
import { Box, Card, CardHeader, Grid } from '@mui/material';
import { PoliceItem } from '../PoliceItem';
import { digit } from '@/utils/number';
import { PoliceCityType, PoliceDataType } from '@/utils/openapi/police/data';

type Props = {
	items: PoliceDataType[];
};

export const PoliceList: React.FC<Props> = ({ items }) => {
	return (
		<Grid container spacing={3}>
			{items &&
				items.length > 0 &&
				items.map((item, index) => {
					const { 경찰서, 발생년도, 강도, 살인, 절도, 폭력 } = item;
					const dataObj = {
						강도,
						살인,
						절도,
						폭력,
					};

					const title = `${경찰서}`;
					const subheader = `총 발생건수 : ${digit(강도 + 살인 + 절도 + 폭력)} 건`;
					return (
						<PoliceItem
							dataObj={dataObj}
							key={`${index.toString()}`}
							subheader={subheader}
							title={title}
						/>
					);
				})}
		</Grid>
	);
};

PoliceList.displayName = 'PoliceList';
