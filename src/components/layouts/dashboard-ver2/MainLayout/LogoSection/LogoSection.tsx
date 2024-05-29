// material-ui
import { ButtonBase } from '@mui/material';
import { Logo } from './Logo';

export const LogoSection: React.FC = () => {
	return (
		<ButtonBase
			disableRipple
			//  onClick={() => dispatch({ type: MENU_OPEN, id: defaultId })} component={Link} to={config.defaultPath}
		>
			<Logo />
		</ButtonBase>
	);
};

LogoSection.displayName = 'LogoSection';
