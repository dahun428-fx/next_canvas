// ----------------------------------------------------------------------

import { SvgColor } from '../svg-color';

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
		title: 'dashboard',
		path: '/dashboard',
		icon: icon('ic_analytics'),
		children: [
			{
				title: '강력범죄 발생현황',
				path: '/dashboard/violent-crime',
				icon: icon('ic_analytics'),
				children: [
					{
						title: '경찰서별',
						icon: icon('ic_analytics'),
						path: '/dashboard/violent-crime/office',
					},
					{
						title: '연도/지역별',
						icon: icon('ic_analytics'),
						path: '/dashboard/violent-crime/yearly',
					},
					{
						title: '지역별 상세',
						icon: icon('ic_analytics'),
						path: '/dashboard/violent-crime/region',
					},
				],
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
