import { forwardRef } from 'react';
import { Icon } from '@iconify/react';

import Box from '@mui/material/Box';

// ----------------------------------------------------------------------

export type IconifyProps = {
	icon: string;
	sx?: object;
	width?: number;
};

export const Iconify = forwardRef<HTMLDivElement, IconifyProps>(
	({ icon, width = 20, sx, ...props }, ref) => (
		<Box
			ref={ref}
			component={Icon}
			className="component-iconify"
			icon={icon}
			sx={{ width, height: width, ...sx }}
			{...props}
		/>
	)
);
Iconify.displayName = 'Iconify';
