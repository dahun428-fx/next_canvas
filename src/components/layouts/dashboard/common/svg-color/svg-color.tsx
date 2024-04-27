import PropTypes from 'prop-types';
import { forwardRef } from 'react';

import Box from '@mui/material/Box';

// ----------------------------------------------------------------------

type Props = {
	src: string;
	sx: object;
};

export const SvgColor = forwardRef<HTMLDivElement, Props>(
	({ src, sx, ...props }, ref) => (
		<Box
			component="span"
			className="svg-color"
			ref={ref}
			sx={{
				width: 24,
				height: 24,
				display: 'inline-block',
				bgcolor: 'currentColor',
				mask: `url(${src}) no-repeat center / contain`,
				WebkitMask: `url(${src}) no-repeat center / contain`,
				...sx,
			}}
			{...props}
		/>
	)
);
SvgColor.displayName = 'SvgColor';
