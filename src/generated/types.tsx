import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type League = {
  __typename?: 'League';
  id: Scalars['String'];
  name: Scalars['String'];
};

export type Match = {
  __typename?: 'Match';
  id: Scalars['String'];
  name: Scalars['String'];
  location: Venue;
  type: MatchType;
  league?: Maybe<League>;
};

export enum MatchType {
  Casual = 'CASUAL',
  League = 'LEAGUE'
}

export type Mutation = {
  __typename?: 'Mutation';
  CreatePlayer: Player;
};


export type MutationCreatePlayerArgs = {
  player: NewPlayer;
};

export type NewPlayer = {
  firstName: Scalars['String'];
  lastName: Scalars['String'];
  dob?: Maybe<Scalars['String']>;
  picture?: Maybe<Scalars['String']>;
  attributes: NewPlayerAttributes;
};

export type NewPlayerAttributes = {
  position: Position;
  speed: Scalars['Int'];
  dribble: Scalars['Int'];
  pass: Scalars['Int'];
  gk?: Maybe<Scalars['Int']>;
  team: Scalars['Int'];
  stamina: Scalars['Int'];
  shoot: Scalars['Int'];
  defense: Scalars['Int'];
  head: Scalars['Int'];
  iq: Scalars['Int'];
};

export type Player = {
  __typename?: 'Player';
  id: Scalars['String'];
  firstName: Scalars['String'];
  lastName: Scalars['String'];
  picture?: Maybe<Scalars['String']>;
  dob?: Maybe<Scalars['String']>;
  attributes: PlayerAttributes;
};

export type PlayerAttributes = {
  __typename?: 'PlayerAttributes';
  position: Position;
  speed: Scalars['Int'];
  gk?: Maybe<Scalars['Int']>;
  dribble: Scalars['Int'];
  pass: Scalars['Int'];
  shoot: Scalars['Int'];
  team: Scalars['Int'];
  defense: Scalars['Int'];
  stamina: Scalars['Int'];
  head: Scalars['Int'];
  iq: Scalars['Int'];
};

export enum Position {
  Gk = 'GK',
  Def = 'DEF',
  Mid = 'MID',
  Fw = 'FW'
}

export type Query = {
  __typename?: 'Query';
  players?: Maybe<Array<Player>>;
};

export type Venue = {
  __typename?: 'Venue';
  id: Scalars['String'];
  name: Scalars['String'];
};

export type CreatePlayerMutationVariables = Exact<{
  player: NewPlayer;
}>;


export type CreatePlayerMutation = (
  { __typename?: 'Mutation' }
  & { CreatePlayer: (
    { __typename?: 'Player' }
    & Pick<Player, 'id' | 'firstName' | 'lastName' | 'dob' | 'picture'>
    & { attributes: (
      { __typename?: 'PlayerAttributes' }
      & Pick<PlayerAttributes, 'position' | 'gk' | 'team' | 'speed' | 'dribble' | 'pass' | 'shoot' | 'defense' | 'stamina' | 'iq' | 'head'>
    ) }
  ) }
);

export type GetPlayersQueryVariables = Exact<{ [key: string]: never; }>;


export type GetPlayersQuery = (
  { __typename?: 'Query' }
  & { players?: Maybe<Array<(
    { __typename?: 'Player' }
    & Pick<Player, 'id' | 'firstName' | 'lastName' | 'picture' | 'dob'>
    & { attributes: (
      { __typename?: 'PlayerAttributes' }
      & Pick<PlayerAttributes, 'position' | 'head' | 'defense' | 'pass' | 'shoot' | 'dribble' | 'iq'>
    ) }
  )>> }
);


export const CreatePlayerDocument = gql`
    mutation CreatePlayer($player: NewPlayer!) {
  CreatePlayer(player: $player) {
    id
    firstName
    lastName
    dob
    picture
    attributes {
      position
      gk
      team
      speed
      dribble
      pass
      shoot
      defense
      stamina
      iq
      head
    }
  }
}
    `;
export type CreatePlayerMutationFn = Apollo.MutationFunction<CreatePlayerMutation, CreatePlayerMutationVariables>;

/**
 * __useCreatePlayerMutation__
 *
 * To run a mutation, you first call `useCreatePlayerMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreatePlayerMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createPlayerMutation, { data, loading, error }] = useCreatePlayerMutation({
 *   variables: {
 *      player: // value for 'player'
 *   },
 * });
 */
export function useCreatePlayerMutation(baseOptions?: Apollo.MutationHookOptions<CreatePlayerMutation, CreatePlayerMutationVariables>) {
        return Apollo.useMutation<CreatePlayerMutation, CreatePlayerMutationVariables>(CreatePlayerDocument, baseOptions);
      }
export type CreatePlayerMutationHookResult = ReturnType<typeof useCreatePlayerMutation>;
export type CreatePlayerMutationResult = Apollo.MutationResult<CreatePlayerMutation>;
export type CreatePlayerMutationOptions = Apollo.BaseMutationOptions<CreatePlayerMutation, CreatePlayerMutationVariables>;
export const GetPlayersDocument = gql`
    query GetPlayers {
  players {
    id
    firstName
    lastName
    picture
    dob
    attributes {
      position
      head
      defense
      pass
      shoot
      dribble
      iq
    }
  }
}
    `;

/**
 * __useGetPlayersQuery__
 *
 * To run a query within a React component, call `useGetPlayersQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetPlayersQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetPlayersQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetPlayersQuery(baseOptions?: Apollo.QueryHookOptions<GetPlayersQuery, GetPlayersQueryVariables>) {
        return Apollo.useQuery<GetPlayersQuery, GetPlayersQueryVariables>(GetPlayersDocument, baseOptions);
      }
export function useGetPlayersLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetPlayersQuery, GetPlayersQueryVariables>) {
          return Apollo.useLazyQuery<GetPlayersQuery, GetPlayersQueryVariables>(GetPlayersDocument, baseOptions);
        }
export type GetPlayersQueryHookResult = ReturnType<typeof useGetPlayersQuery>;
export type GetPlayersLazyQueryHookResult = ReturnType<typeof useGetPlayersLazyQuery>;
export type GetPlayersQueryResult = Apollo.QueryResult<GetPlayersQuery, GetPlayersQueryVariables>;