// material-ui
import { useTheme } from '@mui/material/styles';
import { Avatar, Box, ButtonBase } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { LogoSection } from '../LogoSection';
import {
	paletteSecondary200,
	paletteSecondary600_Dark,
	paletteSecondaryLight,
} from '../constant';

type Props = {
	handleLeftDrawerToggle: () => void;
};

export const Header: React.FC<Props> = ({ handleLeftDrawerToggle }) => {
	const theme = useTheme();

	return (
		<>
			{/* logo & toggler button */}
			<Box
				sx={{
					width: 228,
					display: 'flex',
					[theme.breakpoints.down('md')]: {
						width: 'auto',
					},
				}}
			>
				<Box
					component="span"
					sx={{ display: { xs: 'none', md: 'block' }, flexGrow: 1 }}
				>
					<LogoSection />
				</Box>
				<ButtonBase sx={{ borderRadius: '12px', overflow: 'hidden' }}>
					<Avatar
						variant="rounded"
						sx={{
							transition: 'all .2s ease-in-out',
							background: paletteSecondaryLight,
							color: paletteSecondary200,
							'&:hover': {
								background: paletteSecondary600_Dark,
								color: paletteSecondaryLight,
							},
						}}
						onClick={handleLeftDrawerToggle}
						color="inherit"
					>
						<MenuIcon />
					</Avatar>
				</ButtonBase>
			</Box>

			{/* header search */}
			{/* <SearchSection /> */}
			<Box sx={{ flexGrow: 1 }} />
			<Box sx={{ flexGrow: 1 }} />

			{/* notification & profile */}
			{/* <NotificationSection />
    <ProfileSection /> */}
		</>
	);
};

Header.displayName = 'Header';
