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

    return (
        <CardStyle>
            <CardContent sx={{ p: 2 }}>
                <List sx={{ p: 0, m: 0 }}>
                    <ListItem alignItems="flex-start" disableGutters sx={{ p: 0 }}>
                        <ListItemAvatar sx={{ mt: 0 }}>
                            <Avatar
                                variant="rounded"
                                sx={{
                                    color: palettePrimary500_Main,
                                    border: 'none',
                                    borderColor:palettePrimary500_Main,
                                    background: '#fff',
                                    marginRight: '12px'
                                }}
                            >
                                <TableChartOutlinedIcon fontSize="inherit" />
                            </Avatar>
                        </ListItemAvatar>
                        <ListItemText
                            sx={{ mt: 0 }}
                            primary={
                                <Typography variant="subtitle1" sx={{ color: palettePrimary800 }}>
                                    Get Extra Space
                                </Typography>
                            }
                            secondary={<Typography variant="caption"> 28/23 GB</Typography>}
                        />
                    </ListItem>
                </List>
                <LinearProgressWithLabel value={80} />
            </CardContent>
        </CardStyle>
    );
};

MenuCard.displayName = 'MenuCard';
