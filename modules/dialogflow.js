// Imports the Dialogflow library
const dialogflow = require('@google-cloud/dialogflow');

// Instantiates a session client
const sessionClient = new dialogflow.SessionsClient();

async function detectIntent(
  projectId,
  sessionId,
  query,
  contexts,
  languageCode
) {
  // The path to identify the agent that owns the created intent.
  const sessionPath = sessionClient.projectAgentSessionPath(
    projectId,
    sessionId
  );

  // The text query request.
  const request = {
    session: sessionPath,
    queryInput: {
      text: {
        text: query,
        languageCode: languageCode,
      },
    },
  };

  if (contexts && contexts.length > 0) {
    request.queryParams = {
      contexts: contexts,
    };
  }

  const responses = await sessionClient.detectIntent(request);
  return responses[0];
}

async function executeQueries(projectId, sessionId, query, languageCode) {
  // Keeping the context across queries let's us simulte an ongoing conversation with the bot
  let context;
  let intentResponse;
  try {
    console.log(`Sending Query: ${query}`);
    intentResponse = await detectIntent(
      projectId,
      sessionId,
      query,
      context,
      languageCode
    );
    // console.log('Detected intent');
    // console.log(
    //   `Fulfillment Text: ${intentResponse.queryResult.fulfillmentText}`
    // );
    // // Use the context from this response for next queries
    // context = intentResponse.queryResult.outputContexts;
    // console.log(intentResponse.queryResult.intent.displayName)
  } catch (error) {
    console.log(error);
  }
  return intentResponse
}
module.exports = executeQueries