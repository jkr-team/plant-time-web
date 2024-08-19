import React from 'react';

export const getStaticProps = async () => {
  return {
    props: {
      wide: true,
    }
  }
}

export default function PlantsPage() {
  return <div></div>;
}