import React, { useEffect } from 'react';
import Image from 'next/image';
import classNames from 'classnames';

export type Plant = {
  name: string;
  latinName: string;
  image: string;
  family: string;
  height: number;
  care: string;
  color: string;
};

export default function PlantCard({ plant }: { plant: Plant }) {
  const [flipped, setFlipped] = React.useState(false);

  return (
    <div
      className='h-fit w-72 cursor-pointer transition-transform duration-500 animate-in fade-in [perspective:1000px] hover:scale-105 focus:outline-none'
      onClick={() => {
        setFlipped(!flipped);
      }}
      onKeyUp={(e) => {
        if (e.key === ' ' || e.key === 'Enter') {
          setFlipped(!flipped);
        }
      }}
      role='button'
      tabIndex={0}
    >
      <div
        className={classNames('preserve-3d relative h-fit w-full transition-transform duration-700', {
          '[transform:rotateY(180deg)]': flipped,
        })}
      >
        <div className='backface-hidden flex h-fit w-full flex-col overflow-hidden rounded-lg border-4 border-green-800 bg-white p-4 shadow-lg transition-[box-shadow] duration-500 hover:shadow-xl dark:bg-zinc-900'>
          <div className='flex w-full flex-col gap-1 bg-green-800 p-4 text-center text-white'>
            <span className='text-2xl font-bold'>{plant.name}</span>
            <span className='text-lg'>{plant.latinName}</span>
          </div>

          <Image src={plant.image} alt={'Image of ' + plant.name} width={256} height={256} />

          <div className='flex w-full flex-col gap-1 bg-green-800 p-2 text-center text-white'>
            <span className='text-lg'>{plant.family} Family</span>
          </div>
        </div>

        <div className='backface-hidden absolute left-0 top-0 flex h-full w-full flex-col overflow-auto rounded-lg border-4 border-green-800 bg-white p-4 text-black shadow-lg transition-[box-shadow] duration-500 [transform:rotateY(180deg)] hover:shadow-xl dark:border-green-700 dark:bg-zinc-800 dark:text-white'>
          <div className='relative flex min-h-full w-full flex-col gap-2 p-4'>
            <div>
              <span className={'font-bold'}>Height:</span> Up to {plant.height}cm
            </div>
            <div>
              <span className={'font-bold'}>Care Tips:</span> {plant.care}
            </div>
            <div className='flex w-full flex-1 items-end justify-center text-center text-sm'>
              {plant.name}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
