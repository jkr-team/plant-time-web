import PlantCard, { Plant } from './PlantCard';
import LoadingMessage from './LoadingMessage';

export default function PlantsGrid({ plants }: { plants: Plant[] }) {
  return (
    <div className='flex w-full flex-1 basis-0 flex-wrap justify-center gap-8 overflow-y-auto bg-white p-8 dark:bg-zinc-900'>
      {plants.length === 0 && <LoadingMessage message={'Loading plants'} />}

      {plants.map((plant) => (
        <PlantCard plant={plant} key={plant.scientificName} />
      ))}
    </div>
  );
}
