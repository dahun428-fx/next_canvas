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
};

const navConfig: NavConfigType[] = [
	{
		title: 'dashboard',
		path: '/',
		icon: icon('ic_analytics'),
	},
	{
		title: 'user',
		path: '/user',
		icon: icon('ic_user'),
	},
	{
		title: 'product',
		path: '/products',
		icon: icon('ic_cart'),
	},
	{
		title: 'blog',
		path: '/blog',
		icon: icon('ic_blog'),
	},
	{
		title: 'login',
		path: '/login',
		icon: icon('ic_lock'),
	},
	{
		title: 'Not found',
		path: '/404',
		icon: icon('ic_disabled'),
	},
];

export default navConfig;
