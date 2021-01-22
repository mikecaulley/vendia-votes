const axios = require("axios");
const gql = require("graphql-tag");
const graphql = require("graphql");
const { print } = graphql;

const mutation = gql`
  mutation vote($ballotId: String!, $createdBy: String!, $value: String!) {
    addVote_async(
      input: { ballotId: $ballotId, createdBy: $createdBy, value: $value }
    ) {
      result {
        id
      }
    }
  }
`;

exports.handler = async (event) => {
  const input = event.arguments.input;
  const graphqlData = await axios({
    url: process.env.VENDIA_API_URL,
    method: "post",
    headers: {
      "x-api-key": process.env.VENDIA_API_KEY,
    },
    data: {
      query: print(mutation),
      variables: input,
    },
  });

  const errors = graphqlData.data.errors;
  if (errors) {
    console.log("Vendia GraphQL API Error: ", errors[0]);
    throw new Error(errors[0].message); // throw so the graphQL errors field gets populated
  }

  return { id: graphqlData.data.data["addVote_async"].result.id };
};
