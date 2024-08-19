import React from 'react';
import { LogoBackground } from './LogoBackground';

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
  return <div className=''></div>;
};

export const Apps = ({ data }: AppsProps) => {
  return (
    <div className='w-full flex-1'>
      <LogoBackground />

    </div>
  );
};
