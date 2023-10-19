import React from 'react';

export const Spinner = ({ hide = false, children }: { hide?: boolean; children: React.ReactNode }) => (
  <span className={`animate-spin transition-opacity ${hide ? 'opacity-0' : ''}`}>{children}</span>
);
