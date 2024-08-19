import React from 'react';
import { Container } from '../components/Container';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleLeft } from '@fortawesome/free-solid-svg-icons';
import Link from 'next/link';
import Form from '../components/Form';

export default function SuggestionsPage() {
  return (
    <Container
      top={
        <>
          <Link className='text-zinc-500' href='/' aria-label='Go Back Home'>
            <FontAwesomeIcon icon={faCircleLeft} />
          </Link>
        </>
      }
    >
      <Form controls={[]} />
    </Container>
  );
}
