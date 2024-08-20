import React from 'react';
import Link from 'next/link';

export interface App {
  url: string;
  icon: React.ReactNode;
  title: string;
}

export interface AppIconProps {
  data: App;
}

export interface AppsProps {
  data: App[];
}

export const AppIcon = ({ data }: AppIconProps) => {
  return (
    <div className='flex flex-col items-center gap-4 flex-1'>
      <Link
        href={data.url}
        className='flex aspect-square h-full items-center justify-center overflow-hidden rounded-xl bg-zinc-50 shadow-xl transition-[transform,box-shadow] hover:scale-105 hover:shadow-2xl dark:bg-zinc-800'
      >
        {data.icon}
      </Link>

      <span className='text-center text-lg'>{data.title}</span>
    </div>
  );
};

export const Apps = ({ data }: AppsProps) => {
  return (
    <div className='flex flex-col gap-8 w-full h-full flex-wrap justify-evenly'>
      {data.map((app) => (
        <AppIcon data={app} key={app.url} />
      ))}
    </div>
  );
};
