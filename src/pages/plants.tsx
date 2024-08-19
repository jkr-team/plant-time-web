import { motion } from 'framer-motion';
import React from 'react';
import { Layout } from '../components/Layout';

export const getStaticProps = async () => {
  return {
    props: {
      wide: true,
    },
  };
};

export default function PlantsPage() {
  return (
    <Layout></Layout>
  )
}
