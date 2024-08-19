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
    <div className='flex flex-col items-center gap-4'>
      <Link
        href={data.url}
        className='flex aspect-square w-16 items-center justify-center rounded-xl bg-zinc-50 shadow-xl transition-[transform,box-shadow] hover:scale-105 hover:shadow-2xl dark:bg-zinc-800'
      >
        {data.icon}
      </Link>

      <span className='text-center w-[min-content]'>{data.title}</span>
    </div>
  );
};

export const Apps = ({ data }: AppsProps) => {
  return (
    <div className='flex w-full flex-wrap justify-evenly'>
      {data.map((app) => (
        <AppIcon data={app} key={app.url} />
      ))}
    </div>
  );
};
