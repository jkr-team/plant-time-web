import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLeaf } from '@fortawesome/free-solid-svg-icons';

export const Spinner = ({ hide = false }: { hide?: boolean }) => (
  <span>
    <FontAwesomeIcon icon={faLeaf} className={`animate-spin transition-opacity ${hide ? 'opacity-0' : ''}`} />
  </span>
);
