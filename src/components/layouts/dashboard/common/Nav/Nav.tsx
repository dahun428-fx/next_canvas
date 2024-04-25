import {
	Avatar,
	Box,
	Button,
	CSSObject,
	Drawer,
	IconButton,
	Stack,
	Theme,
	Typography,
	alpha,
	styled,
	useTheme,
} from '@mui/material';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { NAV } from './config-layout';
import { useResponsive } from '@/components/common/hooks/use-responsive';
import navConfig from './config-navigation';
import { NavItem } from './NavItem';
import { Scrollbar } from '@/components/common/Scrollbar';
import { Logo } from '@/components/common/Logo';
import styles from './Nav.module.scss';
import LogoDevIcon from '@mui/icons-material/LogoDev';
import MuiDrawer from '@mui/material/Drawer';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import MenuIcon from '@mui/icons-material/Menu';

type Props = {
	openNav: boolean;
	onCloseNav: () => void;
};

export const Nav: React.FC<Props> = ({ onCloseNav, openNav }) => {
	const pathname = usePathname();
	const [open, setOpen] = useState(true);
	const handleDrawerOpen = () => {
		setOpen(true);
	};

	const handleDrawerClose = () => {
		setOpen(false);
	};
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
			{renderMenu}
			<Box sx={{ flexGrow: 1 }} />
		</Scrollbar>
	);

	const drawerWidth = 240;
	const openedMixin = (theme: Theme): CSSObject => ({
		width: drawerWidth,
		transition: theme.transitions.create('width', {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.enteringScreen,
		}),
		overflowX: 'hidden',
	});

	const closedMixin = (theme: Theme): CSSObject => ({
		transition: theme.transitions.create('width', {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.leavingScreen,
		}),
		overflowX: 'hidden',
		width: `calc(${theme.spacing(7)} + 1px)`,
		[theme.breakpoints.up('sm')]: {
			width: `calc(${theme.spacing(8)} + 1px)`,
		},
	});

	const DrawerHeader = styled('div')(({ theme }) => ({
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'flex-end',
		padding: theme.spacing(0, 1),
		// necessary for content to be below app bar
		...theme.mixins.toolbar,
	}));
	const Drawer = styled(MuiDrawer, {
		shouldForwardProp: prop => prop !== 'open',
	})(({ theme, open }) => ({
		width: drawerWidth,
		flexShrink: 0,
		whiteSpace: 'nowrap',
		boxSizing: 'border-box',
		...(open && {
			...openedMixin(theme),
			'& .MuiDrawer-paper': openedMixin(theme),
		}),
		...(!open && {
			...closedMixin(theme),
			'& .MuiDrawer-paper': closedMixin(theme),
		}),
	}));

	return (
		<Box
			sx={
				{
					// flexShrink: { lg: 0 },
					// width: { lg: NAV.WIDTH },
				}
			}
		>
			<Box>
				<IconButton
					color="inherit"
					aria-label="open drawer"
					onClick={handleDrawerOpen}
					edge="start"
					sx={{
						// marginRight: 5,
						...(open && { display: 'none' }),
					}}
				>
					<MenuIcon />
				</IconButton>
				<Drawer variant="permanent" open={open}>
					<DrawerHeader>
						<IconButton onClick={handleDrawerClose}>
							{/* {theme.direction === 'rtl' ? (
							<ChevronRightIcon />
						) : (
						)} */}
							{open && <ChevronLeftIcon />}
						</IconButton>
						<IconButton
							color="inherit"
							aria-label="open drawer"
							onClick={handleDrawerOpen}
							edge="start"
							sx={{
								// marginRight: 5,
								...(open && { display: 'none' }),
							}}
						>
							<MenuIcon />
						</IconButton>
					</DrawerHeader>
					{open && renderMenu}
				</Drawer>
			</Box>
		</Box>
	);
};

Nav.displayName = 'Nav';
