import React from 'react';
import LoaderB from '../LoaderB'
import LoaderC from '../LoaderC'
import LoaderD from '../LoaderD'

export default function RandomCenterLoader () {
  const randNumber = Math.ceil(Math.random() * 3);
  
  switch (randNumber) {
    case 1:
      return <LoaderB />
    case 2:
      return <LoaderC />
    case 3:
      return <LoaderD />
    default:
      return <LoaderD />
  }
}