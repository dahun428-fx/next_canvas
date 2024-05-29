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
			type: 'item',
			url: '/dashboard/default',
			icon: icons.IconDashboard,
			breadcrumbs: false,
		},
	],
};

export default dashboard;
