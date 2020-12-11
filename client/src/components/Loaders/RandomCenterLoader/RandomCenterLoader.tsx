import React, { FunctionComponent } from 'react';
import LoaderB from '../LoaderB'
import LoaderC from '../LoaderC'
import LoaderD from '../LoaderD'

const RandomCenterLoader: FunctionComponent = () =>{
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

export default RandomCenterLoader;