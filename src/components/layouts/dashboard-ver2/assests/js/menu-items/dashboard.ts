// assets
import { IconDashboard } from '@tabler/icons-react';
import { MenuItem } from '../../../MainLayout/Sidebar/MenuList/types';

// constant
const icons = {
	IconDashboard,
};

// ==============================|| DASHBOARD MENU ITEMS ||============================== //

const dashboard: MenuItem = {
	id: 'dashboard',
	title: 'Dashboard',
	type: 'group',
	children: [
		{
			id: 'default',
			title: 'Dashboard',
			type: 'collapse',
			icon: icons.IconDashboard,
			children: [
				{
					id: 'nation-wide',
					title: '전국',
					type: 'item',
					url: '/dashboard/nation-wide',
					target: true,
				},
				{
					id: 'area-fix',
					title: '지역',
					type: 'item',
					url: '/dashboard/area-fix',
					target: true,
				},
			],
		},
	],
};

export default dashboard;
