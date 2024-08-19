import React from 'react';
import Form from '../components/Form';
import { motion } from 'framer-motion';

export default function SuggestionsPage() {
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
      <Form controls={[]} />
    </motion.div>
  );
}
