import { TableBasic } from '@/components/ui/tables/tableBasic';
import { useMemo } from 'react';
import { ViolentData } from '../ViolentMain';

type Props = {
	dataObject: ViolentData[];
	tableTitle: string;
	labels: string[];
};

export const ViolentTable: React.FC<Props> = ({
	tableTitle,
	dataObject,
	labels,
}) => {
	const rows = useMemo(() => {
		const result = dataObject.map((item, index) => {
			const { label, data } = item;
			const r = data.map((child, childIndex) => {
				return {
					[labels[childIndex]]: child,
				};
			});
			return Object.assign({ city: label }, ...r);
		});

		return result;
	}, [dataObject, labels]);
	if (!dataObject) return null;

	return (
		<div>
			<TableBasic tableTitle={tableTitle} tableHeadData={labels} rows={rows} />
		</div>
	);
};

ViolentTable.displayName = 'ViolentTable';
