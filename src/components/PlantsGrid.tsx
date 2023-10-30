import PlantCard, { Plant } from './PlantCard';
import LoadingMessage from './LoadingMessage';
import React, { useState, useEffect } from 'react';

export default function PlantsGrid({ plants }: { plants: Plant[] }) {
  // Fake delay to simulate loading
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setLoading(false);
    }, 2000);

    return () => clearTimeout(timeout);
  });

  return (
    <div className='flex w-full flex-1 basis-0 justify-center overflow-y-auto'>
      {(plants.length === 0 || loading) && <LoadingMessage message={'Computing Recommendations'} />}

      {!loading && (
        <div className='my-auto grid w-full justify-center justify-items-center gap-8 bg-white p-8 [grid-template-columns:repeat(auto-fill,_290px)] dark:bg-zinc-900'>
          {plants.map((plant) => (
            <PlantCard plant={plant} key={plant.latinName + plant.name} />
          ))}
        </div>
      )}
    </div>
  );
}
