import { SvgIconTypeMap } from '@mui/material';
import { OverridableComponent } from '@mui/material/OverridableComponent';
import { Icon, IconProps } from '@tabler/icons-react';
import { ForwardRefExoticComponent, RefAttributes } from 'react';

// type MenuIconType =
// 	| (OverridableComponent<SvgIconTypeMap<{}, 'svg'>> & {
// 			muiName: string;
// 	  })
// 	| ForwardRefExoticComponent<IconProps & RefAttributes<Icon>>;
type MenuIconType = ForwardRefExoticComponent<IconProps & RefAttributes<Icon>>;
type MenuType = 'group' | 'item' | 'collapse';

export interface MenuItem {
	id: string;
	type: MenuType;
	title?: string;
	caption?: string;
	url?: string;
	target?: boolean;
	breadcrumbs?: boolean;
	icon?: MenuIconType;
	external?: boolean;
	children?: MenuItem[];
}
