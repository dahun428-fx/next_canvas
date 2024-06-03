import { useTheme } from '@mui/material';
import {
	Avatar,
	Chip,
	ListItemButton,
	ListItemIcon,
	ListItemText,
	Typography,
	useMediaQuery,
} from '@mui/material';
import { MenuItem } from '../types';
// assets
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import { useContext, useEffect } from 'react';
import { MainLayoutContext } from '../../../MainLayout';
import { borderRadius } from '../../../constant';
import { useRouter } from 'next/router';

type Props = {
	item: MenuItem;
	level: number;
};

export const NavItem: React.FC<Props> = ({ item, level }) => {
	const router = useRouter();
	const { isOpen, opened, onClose, onOpen, onToggle } =
		useContext(MainLayoutContext);
	const theme = useTheme();
	const matchesSM = useMediaQuery(theme.breakpoints.down('lg'));

	const Icon = item.icon;
	const itemIcon = item?.icon ? (
		Icon && <Icon stroke={1.5} size="1.3rem" />
	) : (
		<FiberManualRecordIcon
			sx={{
				width: isOpen.findIndex(id => id === item?.id) > -1 ? 8 : 6,
				height: isOpen.findIndex(id => id === item?.id) > -1 ? 8 : 6,
			}}
			fontSize={level > 0 ? 'inherit' : 'medium'}
		/>
	);

	let itemTarget = '_self';
	if (item.target) {
		itemTarget = '_blank';
	}

	const itemHandler = (item: MenuItem) => {
		const { id, url, external } = item;
		if (url) {
			if (external) {
				location.href = `${url}`;
			} else {
				router.push(url);
			}
		}
		onOpen(id ?? '');
		if (matchesSM) onClose();
	};

	// active menu item on page load
	useEffect(() => {
		const currentIndex = document.location.pathname
			.toString()
			.split('/')
			.findIndex(id => id === item.id);
		if (currentIndex > -1) {
			onOpen(item.id ?? '');
		}
		// eslint-disable-next-line
	}, []);

	return (
		<ListItemButton
			disabled={item?.disabled}
			sx={{
				borderRadius: `${borderRadius}px`,
				mb: 0.5,
				alignItems: 'flex-start',
				backgroundColor: level > 1 ? 'transparent !important' : 'inherit',
				py: level > 1 ? 1 : 1.25,
				pl: `${level * 24}px`,
			}}
			selected={isOpen.findIndex(id => id === item.id) > -1}
			onClick={() => itemHandler(item)}
		>
			<ListItemIcon sx={{ my: 'auto', minWidth: !item?.icon ? 18 : 36 }}>
				{itemIcon}
			</ListItemIcon>
			<ListItemText
				primary={<Typography color="inherit">{item.title}</Typography>}
				secondary={
					item.caption && (
						<Typography variant="caption" display="block" gutterBottom>
							{item.caption}
						</Typography>
					)
				}
			/>
			{item.chip && (
				<Chip
					color={item.chip.color}
					variant={item.chip.variant}
					size={item.chip.size}
					label={item.chip.label}
					avatar={item.chip.avatar && <Avatar>{item.chip.avatar}</Avatar>}
				/>
			)}
		</ListItemButton>
	);
};

NavItem.displayName = 'NavItem';
