import React from 'react';
import { Container } from '../../components/Container';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleLeft } from '@fortawesome/free-solid-svg-icons';

export default function PlantsSubPages() {
  return (
    <Container
      top={
        <>
          <Link className='text-zinc-500' href='/' aria-label='Go Back Home'>
            <FontAwesomeIcon icon={faCircleLeft} />
          </Link>
        </>
      }
    ></Container>
  );
}
