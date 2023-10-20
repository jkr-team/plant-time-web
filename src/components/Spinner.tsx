import React from 'react';

export default function Spinner({ hide = false, children }: { hide?: boolean; children?: React.ReactNode }) {
  return <span className={`animate-spin transition-opacity ${hide ? 'opacity-0' : ''}`}>{children}</span>;
}
