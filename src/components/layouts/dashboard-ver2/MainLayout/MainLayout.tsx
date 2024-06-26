import {
	AppBar,
	Box,
	CssBaseline,
	Toolbar,
	useMediaQuery,
} from '@mui/material';
import { ThemeProvider, useTheme } from '@mui/material/styles';
import React, {
	Dispatch,
	ReactNode,
	Suspense,
	createContext,
	useContext,
	useReducer,
} from 'react';
import { Sidebar } from './Sidebar';
import { Header } from './Header';
import themes from '../../../../themes';
import Loading from '../../dashboard/common/Loading';
import styles from './MainLayout.module.scss';

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

export const MainLayout: React.FC<{ children: ReactNode }> = ({ children }) => {
	const theme = useTheme();
	const matchDownMd = useMediaQuery(theme.breakpoints.down('md'));
	const { onOpen, onClose, opened, onToggle, isOpen } =
		useContext(MainLayoutContext);

	return (
		<Box sx={{ display: 'flex' }}>
			<CssBaseline />
			{/* header */}
			<AppBar
				enableColorOnDark
				position="fixed"
				color="inherit"
				elevation={0}
				sx={{
					bgcolor: theme.palette.background.default,
					transition: opened ? theme.transitions.create('width') : 'none',
				}}
			>
				<Toolbar>
					<Header handleLeftDrawerToggle={onToggle} />
				</Toolbar>
			</AppBar>
			{/* drawer */}
			<Sidebar matchDownMd={matchDownMd} />
			{/* main content */}
			<main className={opened ? styles.main : styles.mainClose}>
				{children}
			</main>
			{/* <Customization /> */}
		</Box>
	);
};

MainLayout.displayName = 'MainLayout';

export const Layout: React.FC<{ children: ReactNode }> = ({ children }) => {
	return (
		<MainLayoutProvider>
			<ThemeProvider theme={themes()}>
				<MainLayout>
					<Suspense fallback={<Loading />}>{children}</Suspense>
				</MainLayout>
			</ThemeProvider>
		</MainLayoutProvider>
	);
};
