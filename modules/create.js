const projectId = process.env.PROJECTID
const laptopEntityId = process.env.LAPTOPENTITYID
const dialogflow = require('@google-cloud/dialogflow');

const intentsClient = new dialogflow.IntentsClient();
const entitysClient = new dialogflow.EntityTypesClient()

module.exports.createIntent = async function createIntent(intent) {
  const agentPath = intentsClient.agentPath(projectId);
  const createIntentRequest = {
    parent: agentPath,
    intent: intent,
  };
  const [response] = await intentsClient.createIntent(createIntentRequest);
  console.log(`Intent ${response.name} created`);
}

module.exports.createEnity = async function createEntity(entity) {
  const entityPath = `projects/${projectId}/agent/entityTypes/${laptopEntityId}`

  const createEnitityRequest = {
    parent: entityPath,
    entities: entity
  }
  const response = await entitysClient.batchCreateEntities(createEnitityRequest)
  console.log(`Enity ${response.name} created`)
}



