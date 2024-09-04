import { motion } from 'framer-motion';
import React from 'react';
import Spinner from '../img/spinner.svg';

export type LayoutProps = {
  children?: React.ReactNode;
  isLoading?: boolean;
};

export const Layout = ({ children, isLoading }: LayoutProps) => {
  return (
    <motion.div
      initial={{ y: 300, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: 300, opacity: 0 }}
      transition={{
        type: 'spring',
        stiffness: 260,
        damping: 20,
      }}
      className='relative flex w-full flex-1 flex-col'
    >
      {isLoading && (
        <div className='absolute flex h-full w-full items-center justify-center bg-white text-green-500 dark:bg-zinc-900 [&>svg]:block [&>svg]:w-24'>
          <Spinner />
        </div>
      )}
      {children}
    </motion.div>
  );
};
