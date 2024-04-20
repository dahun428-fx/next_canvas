import { AppBar, Box, IconButton, Toolbar } from '@mui/material';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import styles from './BottomAppBar.module.scss';
import { BottomNavi } from '../BottomNavi';

type Props = {
	showState: boolean;
	handleToggle: () => void;
};

export const BottomAppBar: React.FC<Props> = ({ handleToggle, showState }) => {
	return (
		<>
			{showState ? (
				<AppBar
					position="fixed"
					color="primary"
					sx={{ top: 'auto', bottom: 0 }}
				>
					<Toolbar>
						<IconButton color="inherit" aria-label="open drawer"></IconButton>
						<Box sx={{ flexGrow: 1 }} />
						<BottomNavi />
						<IconButton color="inherit" onClick={handleToggle}>
							<ArrowDropDownIcon fontSize="large" />
						</IconButton>
					</Toolbar>
				</AppBar>
			) : (
				<Box className={styles.closeBar} onClick={handleToggle}>
					<IconButton color="inherit">
						<ArrowDropUpIcon fontSize="large" />
					</IconButton>
				</Box>
			)}
		</>
	);
};

BottomAppBar.displayName = 'BottomAppBar';
