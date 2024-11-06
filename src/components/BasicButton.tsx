import { Button, ButtonProps } from '@mui/material';
import { ReactNode } from 'react';

interface BasicButtonProps extends ButtonProps {
  children: ReactNode;
  variant?: 'contained' | 'outlined' | 'text';
  color?: 'primary' | 'secondary' | 'error' | 'info' | 'success' | 'warning';
  size?: 'small' | 'medium' | 'large';
  fullWidth?: boolean;
  disabled?: boolean;
}

export const BasicButton = ({
  children,
  variant = 'contained',
  color = 'primary',
  size = 'medium',
  fullWidth = false,
  disabled = false,
  ...props
}: BasicButtonProps) => {
  return (
    <Button
      variant={variant}
      color={color}
      size={size}
      fullWidth={fullWidth}
      disabled={disabled}
      {...props}
    >
      {children}
    </Button>
  );
};