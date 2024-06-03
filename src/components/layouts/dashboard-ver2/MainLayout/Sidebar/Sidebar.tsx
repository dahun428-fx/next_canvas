// material-ui
import { useTheme } from '@mui/material/styles';
import { Box, useMediaQuery } from '@mui/material';
import Drawer from '@mui/material/Drawer';

// third-party
import PerfectScrollbar from 'react-perfect-scrollbar';
import { BrowserView, MobileView } from 'react-device-detect';

import { LogoSection } from '../LogoSection';
import { drawerWidth } from '../constant';
import { useContext } from 'react';
import { MainLayoutContext } from '../MainLayout';
import { MenuList } from './MenuList';

type Props = {
	matchDownMd: boolean;
};

export const Sidebar: React.FC<Props> = ({ matchDownMd }) => {
	const theme = useTheme();
	const matchUpMd = useMediaQuery(theme.breakpoints.up('md'));

	const { onOpen, onClose, opened, isOpen, onToggle } =
		useContext(MainLayoutContext);
	const drawerOpen = !matchDownMd ? opened : !opened;
	const drawer = (
		<>
			<Box sx={{ display: { xs: 'block', md: 'none' } }}>
				<Box sx={{ display: 'flex', p: 2, mx: 'auto' }}>
					<LogoSection />
				</Box>
			</Box>
			<BrowserView>
				<PerfectScrollbar
					component="div"
					style={{
						height: !matchUpMd ? 'calc(100vh - 56px)' : 'calc(100vh - 88px)',
						paddingLeft: '16px',
						paddingRight: '16px',
					}}
				>
					<MenuList />
					{/* <MenuCard /> */}
				</PerfectScrollbar>
			</BrowserView>
			<MobileView>
				<Box sx={{ px: 2 }}>
					{/* <MenuList /> */}
					{/* <MenuCard /> */}
				</Box>
			</MobileView>
		</>
	);

	if (window === undefined) {
		return null;
	}

	return (
		<Box
			component="nav"
			sx={{ flexShrink: { md: 0 }, width: matchUpMd ? drawerWidth : 'auto' }}
			aria-label="mailbox folders"
		>
			<Drawer
				container={window.document.body}
				variant={matchUpMd ? 'persistent' : 'temporary'}
				anchor="left"
				open={drawerOpen}
				onClose={onToggle}
				sx={{
					'& .MuiDrawer-paper': {
						width: drawerWidth,
						background: theme.palette.background.default,
						color: theme.palette.text.primary,
						borderRight: 'none',
						[theme.breakpoints.up('md')]: {
							top: '88px',
						},
					},
				}}
				ModalProps={{ keepMounted: true }}
				color="inherit"
			>
				{drawer}
			</Drawer>
		</Box>
	);
};

Sidebar.displayName = 'Sidebar';
