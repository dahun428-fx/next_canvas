import { Typography } from '@mui/material';
import menuItems from '../../../assests/js/menu-items';
import { NavGroup } from './NavGroup';

type Props = {};

export const MenuList: React.FC<Props> = () => {
	const navItems = menuItems.items.map(item => {
		switch (item.type) {
			case 'group':
				return <NavGroup key={item.id} item={item} />;
			default:
				return (
					<Typography key={item.id} variant="h6" color="error" align="center">
						Menu Items Error
					</Typography>
				);
		}
	});

	return <>{navItems}</>;
};

MenuList.displayName = 'MenuList';
