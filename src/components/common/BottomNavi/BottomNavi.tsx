import {
	BottomNavigation,
	BottomNavigationAction,
	Box,
	Card,
} from '@mui/material';
import RestoreIcon from '@mui/icons-material/Restore';
import FavoriteIcon from '@mui/icons-material/Favorite';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import { useState } from 'react';
import styles from './BottomNavi.module.scss';

type Props = {};

export const BottomNavi: React.FC<Props> = () => {
	const [value, setValue] = useState(0);
	return (
		<Card className={styles.bottomfixed}>
			<BottomNavigation
				showLabels
				value={value}
				onChange={(event, newValue) => {
					setValue(newValue);
				}}
			>
				<BottomNavigationAction label="Recents" icon={<RestoreIcon />} />
				<BottomNavigationAction label="Favorites" icon={<FavoriteIcon />} />
				<BottomNavigationAction label="Nearby" icon={<LocationOnIcon />} />
			</BottomNavigation>
		</Card>
	);
};

BottomNavi.displayName = 'BottomNavi';
