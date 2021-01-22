import { createClient, dedupExchange, fetchExchange } from 'urql';
import { cacheExchange } from '@urql/exchange-graphcache';
import config from 'src/config';
import { ballotInfoQuery } from './components/BallotInfo';
import { BallotInfoQuery, Mutation, MutationVoteArgs, Vote, VoteInput } from './generated/graphql';

const client = createClient({
  url: config.apiUrl,
  exchanges: [
    dedupExchange,
    cacheExchange({
      updates: {
        Mutation: {
          vote: (result, args, cache) => {
            const id = (result as Mutation).vote?.id;
            const input: VoteInput = (args as MutationVoteArgs).input;
            const newVote = { __typename: 'vote', id, value: input.value, createdBy: input.createdBy };

            cache.updateQuery({ query: ballotInfoQuery, variables: { id: input.ballotId } }, (data) => {
              (data as BallotInfoQuery)?.ballot?.votes.push(newVote as Vote);
              return data;
            });
          },
        },
      },
    }),
    fetchExchange,
  ],
  fetchOptions: () => {
    return {
      headers: { 'x-api-key': config.apiKey },
    };
  },
});

export default client;
