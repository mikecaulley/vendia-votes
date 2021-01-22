# Vendia Votes

A simple voting application built with

* [Vendia](https://vendia.net) - SasS block-chain backend
* [AWS AppSync](https://aws.amazon.com/appsync/) - API service as middleware
* [AWS Lambdas](https://aws.amazon.com/lambda/) - Serverless compute for AppySync GraphQL resolvers 
* [React](https://vendia.net) - React App


## Vendia

Contains all Vendia configuration files for creating and managing
Vendia Universal Apps (Unis).

Information about the CLI is available at Vendia's [document site](https://vendia.net/docs/share/quickstart/cli).

## Lambdas

We use a middle layer to expand on the Vendia generated API. This allows
our react app to have simplified GraphQL operations.

## React App

A React JS app that allows a user to cast votes.

### Quick Start (~30 minutes)

1. Sign up for a Vendia account.


2. Install the Vendia CLI
   * `% npm install @vendia/share-cli -g`
   

3. Update `vendia/registration.json` to have a unique Uni name and your userId.
   * Prefix your Uni name with `test-` so that Vendia treats it as a test/development Uni

   
4. Create the Vendia Uni
   * `% share uni create --config vendia/registration.json`

   
5. Create an AppSync API from `scehama.graphql`.


6. Create Lambdas for each folder under `/lambdas`.


7. Within the AppSync console, wire the Lambdas to the appropriate resolvers.


8. Update the `apiUrl` and `apiKey` in `/app/src/config.js`. 


9. From `/app` run `yarn install` then `yarn start`
