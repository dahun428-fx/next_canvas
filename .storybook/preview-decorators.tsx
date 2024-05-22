// preview-decorators.tsx
import React from 'react';
import { Decorator } from '@storybook/react';
import { ThemeProvider } from '@mui/material';

const previewDecorator: Decorator = (Story, context) => {
	return (
		<ThemeProvider theme="default">
			<Story {...context} />
		</ThemeProvider>
	);
};

export default [previewDecorator];
