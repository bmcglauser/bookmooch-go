import React from 'react';
import './sampleinfo.scss';
import Header from '../../components/Header';
import Info from '../../containers/Info';

export default function SampleInfo () {
  return (
    <>
    <Header title="Sample Info" />
    <div className="page-content">
      <Info />
    </div>
    </>
  );
}