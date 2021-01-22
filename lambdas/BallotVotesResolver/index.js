const axios = require("axios");
const gql = require("graphql-tag");
const graphql = require("graphql");
const { print } = graphql;

const query = gql`
  query listVotes($ballotId: String!) {
    listVotes(filter: { ballotId: { eq: $ballotId } }) {
      Votes {
        id
        value
        createdBy
        ballotId
      }
    }
  }
`;

exports.handler = async (event) => {
  const graphqlData = await axios({
    url: process.env.VENDIA_API_URL,
    method: "post",
    headers: {
      "x-api-key": process.env.VENDIA_API_KEY,
    },
    data: {
      query: print(query),
      variables: { ballotId: event.source.id },
    },
  });

  const errors = graphqlData.data.errors;
  if (errors) {
    console.log("Vendia GraphQL API Error: ", errors[0]);
    throw new Error(errors[0].message); // throw so the graphQL errors field gets populated
  }

  return graphqlData.data.data.listVotes.Votes;
};
