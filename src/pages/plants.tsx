import React from 'react';
import { Layout } from '../components/Layout';
import { type Plant, PlantsGrid } from '../components/Plants';
import useSWRInfinite from 'swr/infinite';

const LIMIT = 1;

export const getStaticProps = async () => {
  return {
    props: {
      wide: true,
    },
  };
};

const fetcher = async (...args: any[]) => {
  // @ts-expect-error
  const res = await fetch(...args);

  return res.json();
};

const getKey = (index: number, previous: Plant[]) => {
  if (previous && !previous.length) {
    return null;
  }

  return `/api/get-plants?page=${index}&limit=${LIMIT}`;
};

export default function PlantsPage() {
  const { data, error, size, setSize } = useSWRInfinite(getKey, fetcher);

  const isEmpty = data?.[0]?.length === 0;
  const isDone = isEmpty || (data && data[data.length - 1]?.length < LIMIT);

  const plants = data?.flat() as Plant[];

  return (
    <Layout>
      <PlantsGrid plants={plants ?? []} />
      {!isDone && <button className="bg-green-500 absolute bottom-8 left-1/2 -translate-x-1/2 px-4 py-2 text-white rounded-full" onClick={() => setSize(size + 1)}>Load More</button>}
    </Layout>
  );
}
