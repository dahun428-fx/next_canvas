import { usePathname } from 'next/navigation';
import navConfig, { NavConfigType } from './config-navigation';
import { Box, ListItemButton, alpha } from '@mui/material';

type Props = {
	item: NavConfigType;
};

export const NavItem: React.FC<Props> = ({ item }) => {
	const pathname = usePathname();

	const active = item.path === pathname;

	return (
		<ListItemButton
			href={item.path}
			sx={{
				minHeight: 44,
				borderRadius: 0.75,
				typography: 'body2',
				color: 'text.secondary',
				textTransform: 'capitalize',
				fontWeight: 'fontWeightMedium',
				...(active && {
					color: 'primary.main',
					fontWeight: 'fontWeightSemiBold',
					bgcolor: theme => alpha(theme.palette.primary.main, 0.08),
					'&:hover': {
						bgcolor: theme => alpha(theme.palette.primary.main, 0.16),
					},
				}),
			}}
		>
			<Box
				component="span"
				sx={{
					width: 24,
					height: 24,
					mr: 2,
				}}
			>
				{item.icon}
			</Box>
			<Box component="span">{item.title}</Box>
		</ListItemButton>
	);
};

NavItem.displayName = 'NavItem';
