import React from 'react';
import Header from 'src/components/Header';
import BallotInfo from 'src/components/BallotInfo';
import { useParams } from 'react-router-dom';

const BallotPage = () => {
  const { id } = useParams<Record<string, string>>();

  return (
    <>
      <Header title={'Ballot'} />
      <BallotInfo ballotId={id} />
    </>
  );
};

export default BallotPage;
