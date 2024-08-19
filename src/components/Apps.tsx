import React from 'react';

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
    <div className=""></div>
  )
};

export const Apps = ({ data }: AppsProps) => {
  return <div></div>
};
