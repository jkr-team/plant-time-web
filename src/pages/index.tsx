import React from 'react';
import Container from '../components/Container';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleQuestion } from '@fortawesome/free-solid-svg-icons';
import Link from 'next/link';
import Form from '../components/Form';

export default function Home() {
  return (
    <Container
      top={
        <>
          <Link className='text-zinc-800 dark:text-zinc-200' href='/about' aria-label='About Plant Time'>
            <FontAwesomeIcon icon={faCircleQuestion} />
          </Link>
        </>
      }
    >
      <Form steps={[]} />
    </Container>
  );
}
