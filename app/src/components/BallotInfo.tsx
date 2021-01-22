import React from 'react';
import 'src/App.css';
import { Flex, Box, Heading, Text } from 'rebass';
import gql from 'graphql-tag';
import { VoteValue, useBallotInfoQuery } from 'src/generated/graphql';
import Vote from 'src/components/Vote';

export const ballotInfoQuery = gql`
  query BallotInfo($id: ID!) {
    ballot(id: $id) {
      id
      title
      description
      votes {
        id
        value
        createdBy
      }
    }
  }
`;

interface OwnProps {
  ballotId: string;
}

const BallotInfo = (props: OwnProps) => {
  const id = props.ballotId;
  const [result] = useBallotInfoQuery({ variables: { id } });

  const { data, fetching, error } = result;

  const getVoteValueColor = (value: VoteValue | undefined): string => {
    switch (value) {
      case VoteValue.Yay:
        return 'success';
      case VoteValue.Nay:
        return 'error';
    }
    return 'text';
  };

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
    <Box ml={5} mr={5}>
      <Heading>{data?.ballot?.title}</Heading>
      <Text color="secondary">{data?.ballot?.description}</Text>
      <Vote ballotId={id} />
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Vote</th>
          </tr>
        </thead>
        <tbody>
          {data?.ballot?.votes.filter(Boolean).map((vote) => {
            return (
              <tr key={vote?.id}>
                <td>{vote?.createdBy}</td>
                <td>
                  <Text sx={{ color: getVoteValueColor(vote?.value) }}>{vote?.value}</Text>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </Box>
  );
};

export default BallotInfo;
