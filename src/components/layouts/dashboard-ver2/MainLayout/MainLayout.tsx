import { Box, CssBaseline, useMediaQuery, useTheme } from '@mui/material';
import {
	Dispatch,
	ReactNode,
	createContext,
	useCallback,
	useContext,
	useReducer,
} from 'react';
import { Sidebar } from './Sidebar';

type MainLayoutState = {
	isOpen: any[];
	opened: boolean;
};

type MainLayoutAction =
	| { type: 'SET_MENU'; id?: string }
	| { type: 'MENU_TOGGLE'; id?: string }
	| { type: 'MENU_OPEN'; id?: string };

type MainLayoutContext = MainLayoutState & {
	onOpen: (id: string) => void;
	onClose: () => void;
	onToggle: () => void;
};
type MainLayoutDispatchContext = Dispatch<MainLayoutAction>;

export const MainLayoutContext = createContext<MainLayoutContext>({
	isOpen: [],
	opened: true,
	onOpen: () => {},
	onClose: () => {},
	onToggle: () => {},
});
export const MainLayoutDispatchContext =
	createContext<MainLayoutDispatchContext | null>(null);

const initialState: MainLayoutState = {
	isOpen: [],
	opened: true,
};
const reducer = (
	state: MainLayoutState,
	action: MainLayoutAction
): MainLayoutState => {
	let id = action.id;
	switch (action.type) {
		case 'MENU_OPEN':
			return { ...state, opened: true, isOpen: [id] };
		case 'SET_MENU':
			return { ...state, opened: false };
		case 'MENU_TOGGLE':
			return { ...state, opened: !state.opened };
		default:
			throw new Error('unhandled action type');
	}
};

export const MainLayoutProvider: React.FC<{ children: ReactNode }> = ({
	children,
}) => {
	const [state, dispatch] = useReducer(reducer, initialState);

	const onClose = () => {
		dispatch({ type: 'SET_MENU' });
	};
	const onOpen = (id: string) => {
		dispatch({ type: 'MENU_OPEN', id: id ?? '' });
	};
	const onToggle = () => {
		dispatch({ type: 'MENU_TOGGLE' });
	};

	return (
		<MainLayoutContext.Provider value={{ ...state, onClose, onOpen, onToggle }}>
			<MainLayoutDispatchContext.Provider value={dispatch}>
				{children}
			</MainLayoutDispatchContext.Provider>
		</MainLayoutContext.Provider>
	);
};
MainLayoutProvider.displayName = 'MainLayoutProvider';

export const MainLayout: React.FC = () => {
	// const [state, dispatch] = useReducer(reducer, initialState);

	// const dispatcher = useCallback(() => {}, []);

	// const handleLeftDrawerToggle = () => {
	// 	dispatch({ type: 'MENU_TOGGLE' });
	// };

	const theme = useTheme();
	const matchDownMd = useMediaQuery(theme.breakpoints.down('md'));

	return (
		<MainLayoutProvider>
			<Box sx={{ display: 'flex' }}>
				<CssBaseline />
				{/* header */}
				{/* <AppBar
                enableColorOnDark
                position="fixed"
                color="inherit"
                elevation={0}
                sx={{
                    bgcolor: theme.palette.background.default,
                    transition: leftDrawerOpened ? theme.transitions.create('width') : 'none'
                }}
            >
                <Toolbar>
                    <Header handleLeftDrawerToggle={handleLeftDrawerToggle} />
                </Toolbar>
            </AppBar> */}

				{/* drawer */}
				<Sidebar matchDownMd={matchDownMd} />

				{/* main content */}
				{/* <Main theme={theme} open={leftDrawerOpened}> */}
				{/* breadcrumb */}
				{/* <Breadcrumbs separator={IconChevronRight} navigation={navigation} icon title rightAlign /> */}
				{/* <Outlet /> */}
				{/* </Main> */}
				{/* <Customization /> */}
			</Box>
		</MainLayoutProvider>
	);
};

MainLayout.displayName = 'MainLayout';
