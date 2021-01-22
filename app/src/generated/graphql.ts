import gql from 'graphql-tag';
import * as Urql from 'urql';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type Ballot = {
  __typename?: 'Ballot';
  id: Scalars['ID'];
  title: Scalars['String'];
  description: Scalars['String'];
  votes: Array<Maybe<Vote>>;
};

export type Mutation = {
  __typename?: 'Mutation';
  vote?: Maybe<VoteResponse>;
};

export type MutationVoteArgs = {
  input: VoteInput;
};

export type VoteResponse = {
  __typename?: 'VoteResponse';
  id: Scalars['ID'];
};

export type Query = {
  __typename?: 'Query';
  ballots: Array<Maybe<Ballot>>;
  ballot?: Maybe<Ballot>;
};

export type QueryBallotArgs = {
  id: Scalars['ID'];
};

export type Vote = {
  __typename?: 'Vote';
  id: Scalars['ID'];
  value: VoteValue;
  createdBy: Scalars['String'];
};

export type VoteInput = {
  value: VoteValue;
  createdBy: Scalars['String'];
  ballotId: Scalars['ID'];
};

export enum VoteValue {
  Yay = 'YAY',
  Nay = 'NAY',
  Abstain = 'ABSTAIN',
}

export type BallotCardFragment = { __typename?: 'Ballot' } & Pick<Ballot, 'id' | 'title' | 'description'>;

export type BallotGridQueryVariables = Exact<{ [key: string]: never }>;

export type BallotGridQuery = { __typename?: 'Query' } & {
  ballots: Array<Maybe<{ __typename?: 'Ballot' } & BallotCardFragment>>;
};

export type BallotInfoQueryVariables = Exact<{
  id: Scalars['ID'];
}>;

export type BallotInfoQuery = { __typename?: 'Query' } & {
  ballot?: Maybe<
    { __typename?: 'Ballot' } & Pick<Ballot, 'id' | 'title' | 'description'> & {
        votes: Array<Maybe<{ __typename?: 'Vote' } & Pick<Vote, 'id' | 'value' | 'createdBy'>>>;
      }
  >;
};

export const BallotCardFragmentDoc = gql`
  fragment BallotCard on Ballot {
    id
    title
    description
  }
`;
export const BallotGridDocument = gql`
  query BallotGrid {
    ballots {
      ...BallotCard
    }
  }
  ${BallotCardFragmentDoc}
`;

export function useBallotGridQuery(options: Omit<Urql.UseQueryArgs<BallotGridQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<BallotGridQuery>({ query: BallotGridDocument, ...options });
}
export const BallotInfoDocument = gql`
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

export function useBallotInfoQuery(options: Omit<Urql.UseQueryArgs<BallotInfoQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<BallotInfoQuery>({ query: BallotInfoDocument, ...options });
}
