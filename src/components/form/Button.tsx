'use client';

import { classNames } from '@/utils/classNames';
import { ButtonHTMLAttributes, FC } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  label: string;
};

export const Button: FC<ButtonProps> = ({ onClick = () => null, className = '', label, ...props }) => {
  return (
    <button onClick={onClick} {...props} className={classNames('border border-black dark:border-white py-2 px-4 rounded-md disabled:opacity-25', className)}>
      {label}
    </button>
  );
};
