import {
	Avatar,
	Box,
	Button,
	Drawer,
	Stack,
	Typography,
	alpha,
} from '@mui/material';
import { usePathname } from 'next/navigation';
import { useEffect } from 'react';
import { NAV } from './config-layout';
import { useResponsive } from '@/components/common/hooks/use-responsive';
import navConfig from './config-navigation';
import { NavItem } from './NavItem';
import { Scrollbar } from '@/components/common/Scrollbar';
import { Logo } from '@/components/common/Logo';

type Props = {
	openNav: boolean;
	onCloseNav: () => void;
};

export const Nav: React.FC<Props> = ({ onCloseNav, openNav }) => {
	const pathname = usePathname();

	const upLg = useResponsive('up', 'lg');

	useEffect(() => {
		if (openNav) {
			onCloseNav();
		}
	}, [pathname]);

	const renderMenu = (
		<Stack component="nav" spacing={0.5} sx={{ px: 2 }}>
			{navConfig.map(item => (
				<NavItem key={item.title} item={item} />
			))}
		</Stack>
	);

	const renderContent = (
		<Scrollbar
			sx={{
				height: 1,
				'& .simplebar-content': {
					height: 1,
					display: 'flex',
					flexDirection: 'column',
				},
			}}
		>
			<Logo sx={{ mt: 3, ml: 4 }} />
			{renderMenu}
			<Box sx={{ flexGrow: 1 }} />
		</Scrollbar>
	);

	return (
		<Box
			sx={{
				flexShrink: { lg: 0 },
				width: { lg: NAV.WIDTH },
			}}
		>
			{upLg ? (
				<Box
					sx={{
						height: 1,
						position: 'fixed',
						width: NAV.WIDTH,
						borderRight: theme => `dashed 1px ${theme.palette.divider}`,
					}}
				>
					{renderContent}
				</Box>
			) : (
				<Drawer
					open={openNav}
					onClose={onCloseNav}
					PaperProps={{
						sx: {
							width: NAV.WIDTH,
						},
					}}
				>
					{renderContent}
				</Drawer>
			)}
		</Box>
	);
};

Nav.displayName = 'Nav';
