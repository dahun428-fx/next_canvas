import { Preview } from '@storybook/react';
// import { RouterContext } from "next/dist/shared/lib/router-context"; // Next.js의 RouterContext
import { RouterContext } from 'next/dist/shared/lib/router-context.shared-runtime';
import * as NextImage from 'next/image';
import { CssBaseline, ThemeProvider } from '@mui/material';
import { withThemeFromJSXProvider } from '@storybook/addon-themes';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import '@fontsource/material-icons';
import previewDecorators from './preview-decorators';
// import '../styles/globals.css'; // 전역 스타일 가져오기

// Next.js의 Image 컴포넌트를 Storybook에서 사용할 때 경고를 제거하기 위한 설정
const OriginalNextImage = NextImage.default;

// Object.defineProperty(NextImage, 'default', {
//   configurable: true,
//   value: (props) => <OriginalNextImage {...props} unoptimized />,
// });

const preview: Preview = {
	parameters: {
		actions: { argTypesRegex: '^on[A-Z].*' },
		controls: {
			matchers: {
				color: /(background|color)$/i,
				date: /Date$/,
			},
		},
		nextRouter: {
			Provider: RouterContext.Provider,
		},
	},
	// decorators: previewDecorators,
};

export default preview;
// export const parameters = {
// 	actions: { argTypesRegex: '^on[A-Z].*' },
// 	controls: {
// 		matchers: {
// 			color: /(background|color)$/i,
// 			date: /Date$/,
// 		},
// 	},
// 	nextRouter: {
// 		Provider: RouterContext.Provider,
// 	},
// };
// export const withMuiTheme = (Story) => (
//     <ThemeProvider theme={darkTheme}>
//       <CssBaseline />
//       <Story />
//     </ThemeProvider>
//   );
// export const decorators = [
// 	withThemeFromJSXProvider({
// 		Provider: ThemeProvider,
// 		GlobalStyles: CssBaseline,
// 	}),
// ];
