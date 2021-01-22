import { Input, Label, Select } from '@rebass/forms';
import React, { useState } from 'react';
import { Box, Button, Flex } from 'rebass';
import { useMutation } from 'urql';
import { VoteValue } from '../generated/graphql';

const voteMutation = `
  mutation vote($ballotId: ID!, $createdBy: String!, $value: VoteValue!) {
    vote(input: {ballotId: $ballotId, createdBy: $createdBy, value: $value}) {
      id
    }
  }
`;

interface OwnProps {
  ballotId: String;
}

const Vote = (props: OwnProps) => {
  const voteOptions = [VoteValue.Yay, VoteValue.Nay, VoteValue.Abstain];
  const [name, setName] = useState<string>('');
  const [vote, setVote] = useState<VoteValue>(VoteValue.Yay);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [, voteAction] = useMutation(voteMutation);

  return (
    <Box
      maxWidth={600}
      as="form"
      onSubmit={(e) => {
        e.preventDefault();
        setIsLoading(true);
        const variables = { ballotId: props.ballotId, value: vote, createdBy: name };
        voteAction(variables).then(() => {
          setIsLoading(false);
        });
      }}
      py={3}
    >
      <Flex mx={-2} mb={3}>
        <Box width={1 / 2} px={2}>
          <Label htmlFor="name">Name</Label>
          <Input
            id="name"
            name="name"
            type="text"
            required
            value={name}
            onChange={(e) => setName(e.target.value ?? '')}
          />
        </Box>
        <Box width={1 / 2} px={2}>
          <Label htmlFor="vote">Vote</Label>
          <Select id="vote" name="vote" required value={vote} onChange={(e) => setVote(e.target.value as VoteValue)}>
            {voteOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </Select>
        </Box>
      </Flex>
      <Button disabled={isLoading} type="submit">
        {isLoading ? 'Loading...' : 'Vote'}
      </Button>
    </Box>
  );
};

export default Vote;
