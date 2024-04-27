import { List, ListItemButton, ListItemText } from '@mui/material';
import { CSSProperties, MouseEvent, MutableRefObject } from 'react';

type Props = {
	listItem: string[];
	selectedItem: string;
	setSelectedItem: (event: MouseEvent, value: string) => void;
	style?: CSSProperties;
};

export const CrimeSideList: React.FC<Props> = ({
	listItem,
	selectedItem,
	setSelectedItem,
	style,
}) => {
	if (!listItem || listItem.length < 1) {
		return null;
	}

	return (
		<List
			sx={{
				width: '100%',
				marginTop: '50px',
				maxWidth: 360,
				bgcolor: 'background.paper',
				borderRight: 'dotted 1px rgba(0,0,0,0.12)',
			}}
			style={style}
			component="nav"
			aria-labelledby="nested-list-subheader"
		>
			{listItem.map((item, index) => {
				return (
					<ListItemButton
						key={`${item}_${index}`}
						selected={selectedItem === item}
						onClick={(event: MouseEvent) => setSelectedItem(event, item)}
					>
						<ListItemText primary={`${item}`} />
					</ListItemButton>
				);
			})}
		</List>
	);
};

CrimeSideList.displayName = 'CrimeSideList';
