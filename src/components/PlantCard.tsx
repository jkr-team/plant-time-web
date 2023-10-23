import React, { useEffect } from 'react';
import Image from 'next/image';

export type Plant = {
  name: string;
  scientificName: string;
  image: string;
  season: string;
  family: string;
  heightPotential: number;
  careInformation: string;
};

export default function PlantCard({ plant }: { plant: Plant }) {
  const [flipped, setFlipped] = React.useState(false);

  return (
    <div className=' duration-700 animate-in fade-in slide-in-from-bottom'>
      <div className='flex h-fit w-fit cursor-pointer overflow-hidden rounded-lg bg-transparent shadow-xl transition-[transform,box-shadow] duration-500 ease-in-out hover:scale-105 hover:shadow-2xl'>
        <div className='flex w-full flex-col items-center justify-center'>
          <div className='relative flex w-full items-center justify-center bg-black'>
            <Image
              src={plant.image}
              alt={'Image of ' + plant.name}
              width={256}
              height={236}
              unoptimized
              className='z-10'
            />
          </div>
          <span className='w-full bg-green-50 p-4 text-center text-xl font-bold text-black dark:bg-green-200'>
            {plant.name}
          </span>
        </div>
      </div>
    </div>
  );
}
