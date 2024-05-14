import Box from '@mui/material/Box';

import { useResponsive } from '@/components/common/hooks/use-responsive';

import { NAV, HEADER } from '../Nav/config-layout';
import { ReactNode } from 'react';

// ----------------------------------------------------------------------

type Props = {
	children: ReactNode;
	sx?: object;
	open: boolean;
};

const SPACING = 8;

export const Main: React.FC<Props> = ({ children, sx, open, ...props }) => {
	const lgUp = useResponsive('up', 'lg');

	const leftsize = open && !lgUp ? '240px' : '68px';
	return (
		<Box
			component="main"
			sx={{
				marginLeft: leftsize,
				marginRight: '68px',
				flexGrow: 1,
				minHeight: 1,
				display: 'flex',
				flexDirection: 'column',
				py: `${HEADER.H_MOBILE + SPACING}px`,
				...sx,
			}}
			{...props}
		>
			{children}
		</Box>
	);
};
Main.displayName = 'Main';
