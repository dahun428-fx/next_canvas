import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import { Modal as ModalContainer } from '@mui/material';
import Fade from '@mui/material/Fade';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { ReactNode, useContext, useMemo, useState } from 'react';
import { Context } from './context';

type Props = {
	isOpen?: boolean;
	title?: string | ReactNode;
	onCancel?: () => void;
	children?: ReactNode;
	className?: string;
	size?: ModalSizeType;
};

export const ModalSizeType = {
	lg: 1000,
	md: 600,
	sm: 400,
} as const;
export type ModalSizeType = (typeof ModalSizeType)[keyof typeof ModalSizeType];

export const Modal: React.FC<Props> = ({
	children,
	title,
	size = ModalSizeType.md,
	...props
}) => {
	const style = useMemo(() => {
		return {
			position: 'absolute' as 'absolute',
			top: '50%',
			left: '50%',
			transform: 'translate(-50%, -50%)',
			width: size,
			bgcolor: 'background.paper',
			border: '2px solid #000',
			boxShadow: 24,
			p: 4,
		};
	}, [size]);
	const context = useContext(Context);
	const isOpen = props.isOpen ?? context.isOpen;
	const onCancel = props.onCancel ?? context.close;

	return (
		<div>
			<ModalContainer
				style={{ overflow: 'auto' }}
				aria-labelledby="transition-modal-title"
				aria-describedby="transition-modal-description"
				open={isOpen}
				onClose={onCancel}
				closeAfterTransition
				slots={{ backdrop: Backdrop }}
				slotProps={{
					backdrop: {
						timeout: 500,
					},
				}}
			>
				<Fade in={isOpen}>
					<Box sx={style}>{children}</Box>
				</Fade>
			</ModalContainer>
		</div>
	);
};

Modal.displayName = 'Modal';
