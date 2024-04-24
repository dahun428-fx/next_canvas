import { Box, Grid, IconButton } from '@mui/material';
import React, {
	CSSProperties,
	MouseEvent,
	MutableRefObject,
	SyntheticEvent,
	useEffect,
	useMemo,
	useRef,
	useState,
} from 'react';
import { CrimeSideList } from './CrimeSideList';
import { CrimeTabList } from './CrimeTabList';
import { RegionItem, regionCityArray } from '@/utils/openapi/region/region';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

type ChildPosition = {
	x: number;
	y: number;
};
type Props = {
	selectedData: RegionItem;
	selectedItem: string;
	setSelectedItem: (event: MouseEvent, value: string) => void;
	selectedItemPosition?: ChildPosition | null;
};

export const CrimeMain: React.FC<Props> = ({
	selectedData,
	selectedItem,
	setSelectedItem,
	selectedItemPosition,
}) => {
	// const [parentData, setParentData] = useState<RegionItem>(selectedData);
	const [childCity, setChildCity] = useState<string[]>([]);
	const [childSelectedItem, setChildSelectedItem] = useState<string>('');
	const [sideShow, setSideShow] = useState(true);

	const childSelectItemHandler = (event: MouseEvent, value: string) => {
		setChildSelectedItem(value);
	};

	useEffect(() => {
		if (selectedData.children && selectedData.children.length > 0) {
			const child = selectedData.children.map(item => {
				return item.city_name;
			});
			setChildCity(['전체', ...child]);
		} else {
			setChildCity([]);
			setChildSelectedItem('');
		}
	}, [selectedData]);

	const regionCity = useMemo(() => {
		return regionCityArray;
	}, []);

	const viewData = useMemo(() => {
		if (childSelectedItem) {
			const resultItem = selectedData.children?.filter(child => {
				if (child.city_name === childSelectedItem) {
					return child;
				}
			})[0];
			return resultItem ?? selectedData;
		}
		return selectedData;
	}, [selectedItem, childSelectedItem, selectedData]);

	const childPositionStyle: CSSProperties = useMemo(() => {
		if (selectedItemPosition) {
			console.log(selectedItemPosition?.x, selectedItemPosition?.y);
			const obj: CSSProperties = {
				position: 'fixed',
				maxWidth: '90px',
				overflowY: 'auto',
				maxHeight: '750px',
			};
			return obj;
		}
		return {};
	}, [selectedItemPosition]);

	const handleSideListToggleButton = () => {};

	return (
		<Grid container>
			{sideShow ? (
				<Grid item xs={3} sm={2} md={2}>
					<Grid container>
						<Grid item xs={6} sm={6} md={6}>
							<CrimeSideList
								listItem={regionCity}
								selectedItem={selectedItem}
								setSelectedItem={setSelectedItem}
							/>
						</Grid>
						<Grid item xs={6} sm={6} md={6}>
							{childCity && childCity.length > 0 && (
								<CrimeSideList
									listItem={childCity}
									selectedItem={childSelectedItem}
									setSelectedItem={childSelectItemHandler}
									style={childPositionStyle}
								/>
							)}
						</Grid>
					</Grid>
				</Grid>
			) : (
				<Grid item xs={2} sm={1} md={1}></Grid>
			)}
			<Grid item xs={9} sm={10} md={10}>
				<Box
					sx={{
						position: 'relative',
						right: '80px',
					}}
				>
					<IconButton
						sx={{
							border: '1px solid #ddd',
						}}
						onClick={() => {
							setSideShow(!sideShow);
						}}
					>
						{sideShow ? <ArrowBackIosNewIcon /> : <ArrowForwardIosIcon />}
					</IconButton>
				</Box>
				<CrimeTabList selectedData={viewData} />
			</Grid>
		</Grid>
	);
};
CrimeMain.displayName = 'CrimeMain';
