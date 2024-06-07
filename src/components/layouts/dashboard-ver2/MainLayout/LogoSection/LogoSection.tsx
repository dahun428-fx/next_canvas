// material-ui
import { ButtonBase, Typography, useTheme } from '@mui/material';
import { Logo } from './Logo';

export const LogoSection: React.FC = () => {
	const theme = useTheme();

	return (
		<ButtonBase
			disableRipple
			//  onClick={() => dispatch({ type: MENU_OPEN, id: defaultId })} component={Link} to={config.defaultPath}
		>
			<Logo />
			<Typography
				variant="subtitle1"
				ml={1}
				color={theme.palette.primary.dark}
				fontWeight="bold"
			>
				Police DATA Center
			</Typography>
		</ButtonBase>
	);
};

LogoSection.displayName = 'LogoSection';
