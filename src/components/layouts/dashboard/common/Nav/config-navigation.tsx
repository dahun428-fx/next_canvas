// ----------------------------------------------------------------------

import { SvgColor } from '../svg-color';
import DashboardIcon from '@mui/icons-material/Dashboard';
import LocalPoliceIcon from '@mui/icons-material/LocalPolice';
import RoomIcon from '@mui/icons-material/Room';
import ReviewsIcon from '@mui/icons-material/Reviews';

const icon = (name: string) => (
	<SvgColor
		src={`/assets/icons/navbar/${name}.svg`}
		sx={{ width: 1, height: 1 }}
	/>
);

export type NavConfigType = {
	title: string;
	path: string;
	icon: JSX.Element;
	children?: NavConfigType[];
};

const navConfig: NavConfigType[] = [
	{
		title: 'DASHBOARD',
		path: '/dashboard',
		icon: <DashboardIcon />,
		children: [
			{
				title: '전국',
				path: '/dashboard/nation-wide',
				icon: <DashboardIcon />,
			},
			{
				title: '지역',
				path: '/dashboard/area-fix',
				icon: <DashboardIcon />,
			},
		],
	},
	{
		title: '강력범죄 발생현황 데이터',
		path: '/dashboard/violent-crime',
		icon: icon('ic_analytics'),
		children: [
			{
				title: '경찰서별',
				icon: <LocalPoliceIcon />,
				path: '/dashboard/violent-crime/office',
			},
			{
				title: '연도/지역별',
				icon: <RoomIcon />,
				path: '/dashboard/violent-crime/yearly',
			},
			{
				title: '지역별 상세',
				icon: <ReviewsIcon />,
				path: '/dashboard/violent-crime/region',
			},
		],
	},
	// {
	// 	title: 'user',
	// 	path: '/user',
	// 	icon: icon('ic_user'),
	// },
	// {
	// 	title: 'product',
	// 	path: '/products',
	// 	icon: icon('ic_cart'),
	// },
	// {
	// 	title: 'blog',
	// 	path: '/blog',
	// 	icon: icon('ic_blog'),
	// },
	// {
	// 	title: 'login',
	// 	path: '/login',
	// 	icon: icon('ic_lock'),
	// },
	// {
	// 	title: 'Not found',
	// 	path: '/404',
	// 	icon: icon('ic_disabled'),
	// },
];

export default navConfig;
