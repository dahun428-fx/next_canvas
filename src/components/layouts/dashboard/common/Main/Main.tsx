import Box from '@mui/material/Box';

import { useResponsive } from '@/components/common/hooks/use-responsive';

import { NAV, HEADER } from '../Nav/config-layout';
import { ReactNode } from 'react';

// ----------------------------------------------------------------------

type Props = {
	children: ReactNode;
	sx?: object;
};

const SPACING = 8;

export const Main: React.FC<Props> = ({ children, sx, ...props }) => {
	const lgUp = useResponsive('up', 'lg');

	return (
		<Box
			component="main"
			sx={{
				flexGrow: 1,
				minHeight: 1,
				display: 'flex',
				flexDirection: 'column',
				py: `${HEADER.H_MOBILE + SPACING}px`,
				...(lgUp && {
					px: 2,
					py: `${HEADER.H_DESKTOP + SPACING}px`,
					width: `calc(100% - ${NAV.WIDTH}px)`,
				}),
				...sx,
			}}
			{...props}
		>
			{children}
		</Box>
	);
};
Main.displayName = 'Main';
