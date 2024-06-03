import { Divider, List, Typography, useTheme } from '@mui/material';
import React from 'react';
import { MenuItem } from '../types';
import { NavCollapse } from '../NavCollapse';
import { NavItem } from '../NavItem';

type Props = {
	item: MenuItem;
};

export const NavGroup: React.FC<Props> = ({ item }) => {
	const theme = useTheme();

	// menu list collapse & items
	const items = item.children?.map(menu => {
		switch (menu.type) {
			case 'collapse':
				return <NavCollapse key={menu.id} menu={menu} level={1} />;
			case 'item':
				return <NavItem key={menu.id} item={menu} level={1} />;
			default:
				return (
					<Typography key={menu.id} variant="h6" color="error" align="center">
						Menu Items Error
					</Typography>
				);
		}
	});

	return (
		<>
			<List
				subheader={
					item.title && (
						<Typography
							variant="caption"
							sx={{ fontSize: '14px' }}
							display="block"
							gutterBottom
						>
							{item.title}
							{item.caption && (
								<Typography
									variant="caption"
									sx={{ fontSize: '12px' }}
									display="block"
									gutterBottom
								>
									{item.caption}
								</Typography>
							)}
						</Typography>
					)
				}
			>
				{items}
			</List>

			{/* group divider */}
			<Divider sx={{ mt: 0.25, mb: 1.25 }} />
		</>
	);
};

NavGroup.displayName = 'NavGroup';
