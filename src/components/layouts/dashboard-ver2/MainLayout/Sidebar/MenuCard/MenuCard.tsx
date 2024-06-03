// material-ui
import { styled, useTheme } from '@mui/material/styles';
import {
	Avatar,
	Card,
	CardContent,
	Grid,
	LinearProgress,
	List,
	ListItem,
	ListItemAvatar,
	ListItemText,
	Typography,
	linearProgressClasses,
} from '@mui/material';
// assets
import TableChartOutlinedIcon from '@mui/icons-material/TableChartOutlined';
import {
	palettePrimary500_Main,
	palettePrimary800,
	palettePrimaryLight,
	paletteSecondary200,
} from '../../constant';

type Props = {};

// styles
const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
	height: 10,
	borderRadius: 30,
	[`&.${linearProgressClasses.colorPrimary}`]: {
		backgroundColor: '#fff',
	},
	[`& .${linearProgressClasses.bar}`]: {
		borderRadius: 5,
		backgroundColor: palettePrimary500_Main,
	},
}));

const CardStyle = styled(Card)(({ theme }) => ({
	background: palettePrimaryLight,
	marginBottom: '22px',
	overflow: 'hidden',
	position: 'relative',
	'&:after': {
		content: '""',
		position: 'absolute',
		width: '157px',
		height: '157px',
		background: paletteSecondary200,
		borderRadius: '50%',
		top: '-105px',
		right: '-96px',
	},
}));

function LinearProgressWithLabel({ value, ...others }: { value: number }) {
	const theme = useTheme();

	return (
		<Grid container direction="column" spacing={1} sx={{ mt: 1.5 }}>
			<Grid item>
				<Grid container justifyContent="space-between">
					<Grid item>
						<Typography variant="h6" sx={{ color: palettePrimary800 }}>
							Progress
						</Typography>
					</Grid>
					<Grid item>
						<Typography
							variant="h6"
							color="inherit"
						>{`${Math.round(value)}%`}</Typography>
					</Grid>
				</Grid>
			</Grid>
			<Grid item>
				<BorderLinearProgress variant="determinate" value={value} {...others} />
			</Grid>
		</Grid>
	);
}

export const MenuCard: React.FC<Props> = () => {
	return <div></div>;
};

MenuCard.displayName = 'MenuCard';
