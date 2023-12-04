import { GraphQLClient, gql } from "graphql-request";

const APP_NUMBER = process.env.APP_NUMBER;
const SHARED_API_KEY = process.env.SHARED_API_KEY;
const SHARED_API_URL = "https://frontend-graphql-api.vercel.app/graphql";

const graphQLClient = new GraphQLClient(SHARED_API_URL, { fetch: fetch } );

graphQLClient.setHeaders({
  "x-api-key": `${SHARED_API_KEY}`,
});

export const getUserFromEventyrApi = async (username) => {
  const response =
    (await graphQLClient.request(gql`
      query GetUser($username: String) {
        getUser(username: $username) {
          id
          username
          currentApp
          currentSubLevel
          appTracking {
            id
            appNumber
            subLevelsCompleted
          }
          userCreatedAt
        }
      }
    `,
    {
      username: username,
    }));

  return response.getUser;
};

export const updateSublevel = async (subLevel, username) => {
  const response =
    await graphQLClient.request(gql`
      mutation UpdateUser($updateUserInput: UpdateUserInput) {
        updateUser(updateUserInput: $updateUserInput) {
          message
        }
      }
    `,
    {
      updateUserInput: {
        username: username,
        subLevel: subLevel,
        appNumber: parseInt(APP_NUMBER),
      },
    });

  return response.updateUser.message;
};

export function isProgressRegistered(apiResponse) {
  if (apiResponse && apiResponse.appTracking) {
    const { appTracking } = apiResponse;

    return appTracking.some((app) => app.appNumber === parseInt(APP_NUMBER));
  }

  throw Error("User not found in database.")
}
