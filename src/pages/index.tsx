import React from 'react';
import Container from '../components/Container';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleQuestion } from '@fortawesome/free-solid-svg-icons';
import Link from 'next/link';

export default function Home() {
  return (
    <Container top={<>
      <Link href='/about'>
        <FontAwesomeIcon icon={faCircleQuestion} />
      </Link>
    </>}></Container>
  )
}
