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
import { LegacyRef, forwardRef, useContext, useEffect } from 'react';
import Link from 'next/link';
import {
	MainLayoutContext,
	MainLayoutDispatchContext,
} from '../../../MainLayout';
import { borderRadius } from '../../../constant';

type Props = {
	item: MenuItem;
	level: number;
};

export const NavItem: React.FC<Props> = ({ item, level }) => {
	const { isOpen, opened, onClose, onOpen, onToggle } =
		useContext(MainLayoutContext);
	// const {  } = useContext(MainLayoutDispatchContext);

	const theme = useTheme();
	// const dispatch = useDispatch();
	// const customization = useSelector((state) => state.customization);
	const matchesSM = useMediaQuery(theme.breakpoints.down('lg'));

	const Icon = item.icon;
	const itemIcon = item?.icon ? (
		Icon && <Icon stroke={1.5} size="1.3rem" />
	) : (
		<FiberManualRecordIcon
			// sx={{
			// 	width:
			// 		customization.isOpen.findIndex(id => id === item?.id) > -1 ? 8 : 6,
			// 	height:
			// 		customization.isOpen.findIndex(id => id === item?.id) > -1 ? 8 : 6,
			// }}
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

	let listItemProps = {
		// component: forwardRef(
		// 	(props, ref: LegacyRef<HTMLAnchorElement> | undefined) => (
		// 		<Link ref={ref} {...props} target={itemTarget} />
		// 	)
		// ),
		component: forwardRef(
			(props, ref: LegacyRef<HTMLAnchorElement> | undefined) => {
				if (item.external) {
					return (
						<a ref={ref} href={item.url} target={itemTarget}>
							{item.title}
						</a>
					);
				}
				return <Link ref={ref} href={`${item.url}`} target={itemTarget} />;
			}
		),
	};
	// if (item?.external) {
	// 	// listItemProps = { component: 'a', href: item.url, target: itemTarget };
	// 	listItemProps = forwardRef(
	//         	(props, ref: LegacyRef<HTMLAnchorElement> | undefined) => (
	//         		<Link ref={ref} {...props} target={itemTarget} />
	//         	)};
	// 	// listItemProps = { component: <a href={item.url} target={itemTarget}></a>, href: item.url, target: itemTarget };
	// }

	const itemHandler = (id?: string) => {
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
			// dispatch({ type: MENU_OPEN, id: item.id });
			onOpen(item.id ?? '');
		}
		// eslint-disable-next-line
	}, []);

	return (
		<ListItemButton
			{...listItemProps}
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
			onClick={() => itemHandler(item.id)}
		>
			<ListItemIcon sx={{ my: 'auto', minWidth: !item?.icon ? 18 : 36 }}>
				{itemIcon}
			</ListItemIcon>
			<ListItemText
				primary={
					<Typography
						variant={
							isOpen.findIndex(id => id === item.id) > -1 ? 'h5' : 'body1'
						}
						color="inherit"
					>
						{item.title}
					</Typography>
				}
				secondary={
					item.caption && (
						<Typography
							variant="caption"
							// sx={{ ...theme.typography.subMenuCaption }}
							display="block"
							gutterBottom
						>
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
