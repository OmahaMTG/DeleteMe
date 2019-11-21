import { buildResourceAccessor } from '../ResourceAccessor';
import { ITemplate } from '../../3_Contracts/ITemplate';
import faker from 'faker';
import { buildTestDataManager } from './testDataManager';

const templateApi = buildResourceAccessor<ITemplate>('/template');
const testDataManager = buildTestDataManager<ITemplate>(
  () => ({
    body: faker.random.words(),
    name: faker.random.words()
  }),
  templateApi
);

describe('template API', () => {
  afterAll(async () => {
    testDataManager.CleanAllResources();
  });

  it('Creating a template, should create that template and return a record of that template.', async () => {
    const createdIndex = await testDataManager.CreateTestResources();

    const requestedResource = testDataManager.currentResources[createdIndex].requested;
    const createdResource = testDataManager.currentResources[createdIndex].created;
    const templateFromServer = await templateApi.getResource(createdResource.id);

    expect(templateFromServer).not.toBeUndefined();

    expect(templateFromServer && templateFromServer.body).toEqual(requestedResource.body);
    expect(templateFromServer && templateFromServer.name).toEqual(requestedResource.name);
  });

  it('Getting a template, should return that template.', async () => {
    const createdIndex = await testDataManager.CreateTestResources();

    const createdResponse = testDataManager.currentResources[createdIndex].created;
    const requestedResource = testDataManager.currentResources[createdIndex].requested;

    expect(createdResponse.body).toEqual(requestedResource.body);
    expect(createdResponse.name).toEqual(requestedResource.name);
  });

  it('Deleting a template, should delete that template', async () => {
    const createdIndex = await testDataManager.CreateTestResources();

    const createdResponse = testDataManager.currentResources[createdIndex].created;

    await templateApi.deleteResource(createdResponse.id, true);

    const templateFromServer = await templateApi.getResource(createdResponse.id);

    expect(templateFromServer).toBeUndefined();
  });

  it('Updating a template, should return the updated template.', async () => {
    const itemIndex = await testDataManager.CreateTestResources();

    const createdResponse = testDataManager.currentResources[itemIndex].created;

    const updatedIndex = await testDataManager.UpdateTestResource(createdResponse.id);

    const requestedUpdate = testDataManager.currentResources[updatedIndex].requested;
    const updatedResponse = testDataManager.currentResources[updatedIndex].created;

    expect(updatedResponse.body).toEqual(requestedUpdate.body);
    expect(updatedResponse.name).toEqual(requestedUpdate.name);
  });

  it('Updating a template, and then getting that template, should return that template', async () => {
    const itemIndex = await testDataManager.CreateTestResources();

    const createdResponse = testDataManager.currentResources[itemIndex].created;

    const updatedIndex = await testDataManager.UpdateTestResource(createdResponse.id);

    const serverTemplate = await templateApi.getResource(testDataManager.currentResources[updatedIndex].created.id);

    expect(serverTemplate && serverTemplate.body).toEqual(testDataManager.currentResources[updatedIndex].created.body);
    expect(serverTemplate && serverTemplate.name).toEqual(testDataManager.currentResources[updatedIndex].created.name);
  });

  it('Querying a template, should return that matching templates.', async () => {
    let testIndex = 0;
    for (let index = 0; index < 10; index++) {
      const createdIndex = await testDataManager.CreateTestResources();
      if (index === 5) testIndex = createdIndex;
    }

    const createdResponse = testDataManager.currentResources[testIndex].created;

    const queryResponse = await templateApi.queryResources(0, 1, createdResponse.name);

    expect(createdResponse.body).toEqual(queryResponse.records[0].body);
    expect(createdResponse.name).toEqual(queryResponse.records[0].name);
  });
});
