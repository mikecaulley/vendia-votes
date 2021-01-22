const axios = require("axios");
const gql = require("graphql-tag");
const graphql = require("graphql");
const { print } = graphql;

const query = gql`
  query getBallot($ballotId: ID!) {
    getBallot(id: $ballotId) {
      id
      title
      description
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
      variables: { ballotId: event.arguments.id },
    },
  });

  const errors = graphqlData.data.errors;
  if (errors) {
    console.log("Vendia GraphQL API Error: ", errors[0]);
    throw new Error(errors[0].message); // throw so the graphQL errors field gets populated
  }

  return graphqlData.data.data.getBallot;
};
