// assets
import { IconKey } from '@tabler/icons-react';
import { MenuItem } from '../../../MainLayout/Sidebar/MenuList/types';

// constant
const icons = {
	IconKey,
};

// ==============================|| EXTRA PAGES MENU ITEMS ||============================== //

const pages: MenuItem = {
	id: 'datas',
	title: 'DATA',
	caption: '강력범죄 발생현황',
	type: 'group',
	children: [
		{
			id: 'violent-crime',
			title: 'Police API DATA',
			type: 'collapse',
			icon: icons.IconKey,

			children: [
				{
					id: 'police-data',
					title: '경찰서별',
					type: 'item',
					url: '/dashboard/violent-crime/office',
					target: true,
				},
				{
					id: 'yearly-regional-data',
					title: '연도/지역별',
					type: 'item',
					url: '/dashboard/violent-crime/yearly',
					target: true,
				},
				{
					id: 'regional-detail-data',
					title: '지역별 상세',
					type: 'item',
					url: '/dashboard/violent-crime/region',
					target: true,
				},
			],
		},
	],
};

export default pages;
