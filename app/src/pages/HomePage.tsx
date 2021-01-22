import React from 'react';
import Header from 'src/components/Header';
import BallotGrid from 'src/components/BallotGrid';

const HomePage = () => {
  return (
    <>
      <Header title="Ballots" />
      <BallotGrid />
    </>
  );
};

export default HomePage;
