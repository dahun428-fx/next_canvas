import React, { memo, forwardRef, ReactNode } from 'react';

import Box from '@mui/material/Box';

import { StyledScrollbar, StyledRootScrollbar } from './styles';

// ----------------------------------------------------------------------

type Props = {
	children: ReactNode;
	sx: object;
};

export const Scrollbar = memo(
	forwardRef<HTMLDivElement, Props>(({ children, sx, ...props }, ref) => {
		const userAgent =
			typeof navigator === 'undefined' ? 'SSR' : navigator.userAgent;

		const mobile =
			/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
				userAgent
			);

		if (mobile) {
			return (
				<Box ref={ref} sx={{ overflow: 'auto', ...sx }} {...props}>
					{children}
				</Box>
			);
		}

		return (
			<StyledRootScrollbar>
				<StyledScrollbar
					scrollableNodeProps={{
						ref,
					}}
					clickOnTrack={false}
					sx={sx}
					{...props}
				>
					{children}
				</StyledScrollbar>
			</StyledRootScrollbar>
		);
	})
);
