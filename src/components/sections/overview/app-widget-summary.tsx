import PropTypes from 'prop-types';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

import { fShortenNumber } from '@/utils/format-number';

// ----------------------------------------------------------------------

type Props = {
	color?: string;
	icon?: JSX.Element | string;
	sx?: object;
	title: string;
	total: number;
};

export const AppWidgetSummary: React.FC<Props> = ({
	title,
	total,
	icon,
	color = 'primary',
	sx,
	...props
}) => {
	return (
		<Card
			component={Stack}
			spacing={3}
			direction="row"
			sx={{
				px: 3,
				py: 5,
				borderRadius: 2,
				...sx,
			}}
			{...props}
		>
			{icon && <Box sx={{ width: 64, height: 64 }}>{icon}</Box>}

			<Stack spacing={0.5}>
				<Typography variant="h4">{fShortenNumber(total)}</Typography>

				<Typography variant="subtitle2" sx={{ color: 'text.disabled' }}>
					{title}
				</Typography>
			</Stack>
		</Card>
	);
};
