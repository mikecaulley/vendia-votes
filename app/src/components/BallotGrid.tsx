import React from 'react';
import 'src/App.css';
import { Flex, Text } from 'rebass';
import BallotCard from 'src/components/BallotCard';
import gql from 'graphql-tag';
import { BallotCardFragment, useBallotGridQuery } from 'src/generated/graphql';

gql`
  query BallotGrid {
    ballots {
      ...BallotCard
    }
  }
  ${BallotCard.fragments.ballot}
`;

const BallotGrid = () => {
  const [result] = useBallotGridQuery();
  const { data, fetching, error } = result;

  if (fetching) {
    return (
      <Flex justifyContent="center" alignItems="center" width="100vw" height="100vh">
        Loading...
      </Flex>
    );
  }

  if (error) {
    return <Text>{error.message}</Text>;
  }

  return (
    <Flex width={'90%'} flexWrap="wrap" margin="auto" justifyContent="center">
      {data?.ballots?.map((ballot) => BallotCard(ballot as BallotCardFragment))}
    </Flex>
  );
};

export default BallotGrid;
