import { motion } from 'framer-motion';
import React from 'react';

export const getStaticProps = async () => {
  return {
    props: {
      wide: true,
    },
  };
};

export default function PlantsPage() {
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
    ></motion.div>
  );
}
