import { ChipTypeMap } from '@mui/material';
import { DefaultComponentProps } from '@mui/material/OverridableComponent';
import { Icon, IconProps } from '@tabler/icons-react';
import { ForwardRefExoticComponent, RefAttributes } from 'react';

// type MenuIconType =
// 	| (OverridableComponent<SvgIconTypeMap<{}, 'svg'>> & {
// 			muiName: string;
// 	  })
// 	| ForwardRefExoticComponent<IconProps & RefAttributes<Icon>>;
type MenuIconType = ForwardRefExoticComponent<IconProps & RefAttributes<Icon>>;
type MenuType = 'group' | 'item' | 'collapse';
// type MenuChip = {
// 	color: string;
// 	variant: string;
// 	size: string;
// 	label: string;
// 	avatar: string;
// };
type MenuChip = DefaultComponentProps<ChipTypeMap<{}, 'div'>>;

export interface MenuItem {
	id: string;
	type: MenuType;
	title?: string;
	disabled?: boolean;
	chip?: MenuChip;
	caption?: string;
	url?: string;
	target?: boolean;
	breadcrumbs?: boolean;
	icon?: MenuIconType;
	external?: boolean;
	children?: MenuItem[];
}
