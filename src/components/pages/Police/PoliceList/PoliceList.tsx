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
					return (
						<PoliceItem
							data={item}
							title={item.경찰서}
							key={`${index.toString()}`}
						/>
					);
				})}
		</Grid>
	);
};

PoliceList.displayName = 'PoliceList';
