import { ReactNode, useState } from 'react';
import { Nav } from './common/Nav';
import { Header } from './common/Header';
import { Box } from '@mui/material';
import { Main } from './common/Main';

type Props = {
	children?: ReactNode;
};

export const DashboardLayout: React.FC<Props> = ({ children }) => {
	const [openNav, setOpenNav] = useState(true);
	return (
		<>
			<Header onOpenNav={() => setOpenNav(true)} />

			<Box
				sx={{
					minHeight: 1,
					display: 'flex',
					flexDirection: { xs: 'column', lg: 'row' },
				}}
			>
				<Nav openNav={openNav} onCloseNav={() => setOpenNav(false)} />

				<Main>{children}</Main>
			</Box>
		</>
	);
};

DashboardLayout.displayName = 'DashboardLayout';
