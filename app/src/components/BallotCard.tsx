import React from 'react';
import { Box, Button, Card, Flex, Heading, Text } from 'rebass';
import gql from 'graphql-tag';
import { BallotCardFragment } from 'src/generated/graphql';
import { Link } from 'react-router-dom';

const BallotCard = (ballot: BallotCardFragment) => {
  const { id, title, description } = ballot;

  return (
    <Card
      m={20}
      width="15rem"
      key={id}
      sx={{
        borderRadius: 2,
        boxShadow: '0 0 16px rgba(0, 0, 0, .25)',
      }}
    >
      <Flex height="100%" flexDirection="column" p={10}>
        <Flex flexDirection="column" p={10}>
          <Heading>{title}</Heading>
          <Text color="secondary">{description}</Text>
        </Flex>
        <Box height="100%" sx={{ flexGrow: 1 }} />
        <Box mt={3}>
          <Link to={`ballot/${id}`}>
            <Button width="100%">View</Button>
          </Link>
        </Box>
      </Flex>
    </Card>
  );
};

BallotCard.fragments = {
  ballot: gql`
    fragment BallotCard on Ballot {
      id
      title
      description
    }
  `,
};

export default BallotCard;
