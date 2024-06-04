import {
	Theme as MUITheme,
	ThemeOptions as MUIThemeOptions,
} from '@mui/material/styles';

declare module '@mui/material/styles' {
	interface Theme extends MUITheme {
		typography: {
			fontFamily?: string;
			h6: {
				fontWeight: number;
				color?: string;
				fontSize: string;
			};
			h5: {
				fontSize: string;
				color?: string;
				fontWeight: number;
			};
			h4: {
				fontSize: string;
				color?: string;
				fontWeight: number;
			};
			h3: {
				fontSize: string;
				color?: string;
				fontWeight: number;
			};
			h2: {
				fontSize: string;
				color?: string;
				fontWeight: number;
			};
			h1: {
				fontSize: string;
				color?: string;
				fontWeight: number;
			};
			subtitle1: {
				fontSize: string;
				fontWeight: number;
				color?: string;
			};
			subtitle2: {
				fontSize: string;
				fontWeight: number;
				color?: string;
			};
			caption: {
				fontSize: string;
				color?: string;
				fontWeight: number;
			};
			body1: {
				fontSize: string;
				fontWeight: number;
				lineHeight: string;
			};
			body2: {
				letterSpacing: string;
				fontWeight: number;
				lineHeight: string;
				color?: string;
			};
			button: {
				textTransform: string;
			};
			customInput: {
				marginTop: number;
				marginBottom: number;
				'& > label': {
					top: number;
					left: number;
					color?: string;
					'&[data-shrink="false"]': {
						top: number;
					};
				};
				'& > div > input': {
					padding: string;
				};
				'& legend': {
					display: string;
				};
				'& fieldset': {
					top: number;
				};
			};
			mainContent: {
				backgroundColor?: string;
				width: string;
				minHeight: string;
				flexGrow: number;
				padding: string;
				marginTop: string;
				marginRight: string;
				borderRadius: string;
			};
			menuCaption: {
				fontSize: string;
				fontWeight: number;
				color?: string;
				padding: string;
				textTransform: string;
				marginTop: string;
			};
			subMenuCaption: {
				fontSize: string;
				fontWeight: number;
				color?: string;
				textTransform: string;
			};
			commonAvatar: {
				cursor: string;
				borderRadius: string;
			};
			smallAvatar: {
				width: string;
				height: string;
				fontSize: string;
			};
			mediumAvatar: {
				width: string;
				height: string;
				fontSize: string;
			};
			largeAvatar: {
				width: string;
				height: string;
				fontSize: string;
			};
		};
		palette: {
			mode: string;
			common: {
				black: string;
			};
			primary: {
				light: string;
				main: string;
				dark: string;
				200: string;
				800: string;
			};
			secondary: {
				light: string;
				main: string;
				dark: string;
				200: string;
				800: string;
			};
			error: {
				light: string;
				main: string;
				dark: string;
			};
			orange: {
				light: string;
				main: string;
				dark: string;
			};
			warning: {
				light: string;
				main: string;
				dark: string;
			};
			success: {
				light: string;
				200: string;
				main: string;
				dark: string;
			};
			grey: {
				50: string;
				100: string;
				500: string;
				600: string;
				700: string;
				900: string;
			};
			dark: {
				light: string;
				main: string;
				dark: string;
				800: string;
				900: string;
			};
			text: {
				primary: string;
				secondary: string;
				dark: string;
				hint: string;
			};
			background: {
				paper: string;
				default: string;
			};
		};
	}
	// allow configuration using `createTheme`
	interface ThemeOptions extends MUIThemeOptions {
		ypography: {
			fontFamily?: string;
			h6: {
				fontWeight: number;
				color?: string;
				fontSize: string;
			};
			h5: {
				fontSize: string;
				color?: string;
				fontWeight: number;
			};
			h4: {
				fontSize: string;
				color?: string;
				fontWeight: number;
			};
			h3: {
				fontSize: string;
				color?: string;
				fontWeight: number;
			};
			h2: {
				fontSize: string;
				color?: string;
				fontWeight: number;
			};
			h1: {
				fontSize: string;
				color?: string;
				fontWeight: number;
			};
			subtitle1: {
				fontSize: string;
				fontWeight: number;
				color?: string;
			};
			subtitle2: {
				fontSize: string;
				fontWeight: number;
				color?: string;
			};
			caption: {
				fontSize: string;
				color?: string;
				fontWeight: number;
			};
			body1: {
				fontSize: string;
				fontWeight: number;
				lineHeight: string;
			};
			body2: {
				letterSpacing: string;
				fontWeight: number;
				lineHeight: string;
				color?: string;
			};
			button: {
				textTransform: string;
			};
			customInput: {
				marginTop: number;
				marginBottom: number;
				'& > label': {
					top: number;
					left: number;
					color?: string;
					'&[data-shrink="false"]': {
						top: number;
					};
				};
				'& > div > input': {
					padding: string;
				};
				'& legend': {
					display: string;
				};
				'& fieldset': {
					top: number;
				};
			};
			mainContent: {
				backgroundColor?: string;
				width: string;
				minHeight: string;
				flexGrow: number;
				padding: string;
				marginTop: string;
				marginRight: string;
				borderRadius: string;
			};
			menuCaption: {
				fontSize: string;
				fontWeight: number;
				color?: string;
				padding: string;
				textTransform: string;
				marginTop: string;
			};
			subMenuCaption: {
				fontSize: string;
				fontWeight: number;
				color?: string;
				textTransform: string;
			};
			commonAvatar: {
				cursor: string;
				borderRadius: string;
			};
			smallAvatar: {
				width: string;
				height: string;
				fontSize: string;
			};
			mediumAvatar: {
				width: string;
				height: string;
				fontSize: string;
			};
			largeAvatar: {
				width: string;
				height: string;
				fontSize: string;
			};
		};
		palette: {
			mode: string;
			common: {
				black: string;
			};
			primary: {
				light: string;
				main: string;
				dark: string;
				200: string;
				800: string;
			};
			secondary: {
				light: string;
				main: string;
				dark: string;
				200: string;
				800: string;
			};
			error: {
				light: string;
				main: string;
				dark: string;
			};
			orange: {
				light: string;
				main: string;
				dark: string;
			};
			warning: {
				light: string;
				main: string;
				dark: string;
			};
			success: {
				light: string;
				200: string;
				main: string;
				dark: string;
			};
			grey: {
				50: string;
				100: string;
				500: string;
				600: string;
				700: string;
				900: string;
			};
			dark: {
				light: string;
				main: string;
				dark: string;
				800: string;
				900: string;
			};
			text: {
				primary: string;
				secondary: string;
				dark: string;
				hint: string;
			};
			background: {
				paper: string;
				default: string;
			};
		};
	}
	export function createTheme(options?: ThemeOptions): Theme;
}
