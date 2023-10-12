import React, { InputHTMLAttributes } from 'react';
import classNames from 'classnames';

type TextInputProps = {
  type: 'text' | 'email' | 'password';
  size: 'sm' | 'md' | 'lg';
} & React.HTMLAttributes<HTMLInputElement>;

export const TextInput = ({ type, size, ...props }: TextInputProps) => {
  const classes = classNames('w-full rounded-md border-2 border-gray-300 dark:border-gray-700', props.className, {
    'px-4 py-2': size === 'md',
    'px-2 py-1': size === 'sm',
    'px-6 py-3 text-2xl': size === 'lg',
  });

  return <input {...props} type={type} className={classes} />;
};
