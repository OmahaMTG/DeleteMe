import { buildResourceAccessor } from '../ResourceAccessor';
import { IPresenter } from '../../3_Contracts/IPresenter';
import faker from 'faker';
import { buildTestDataManager } from './testDataManager';

const presenterApi = buildResourceAccessor<IPresenter>('/presenter');
const testDataManager = buildTestDataManager<IPresenter>(
  () => ({
    bio: faker.random.words(),

    contactInfo: faker.random.words(),
    name: faker.random.words()
  }),
  presenterApi
);

describe('presenter API', () => {
  afterAll(async () => {
    testDataManager.CleanAllResources();
  });

  it('Creating a presenter, should create that presenter and return a record of that presenter.', async () => {
    const createdIndex = await testDataManager.CreateTestResources();

    const requestedResource = testDataManager.currentResources[createdIndex].requested;
    const createdResource = testDataManager.currentResources[createdIndex].created;
    const presenterFromServer = await presenterApi.getResource(createdResource.id);

    expect(presenterFromServer).not.toBeUndefined();
    expect(presenterFromServer && presenterFromServer.bio).toEqual(requestedResource.bio);
    expect(presenterFromServer && presenterFromServer.contactInfo).toEqual(requestedResource.contactInfo);
    expect(presenterFromServer && presenterFromServer.name).toEqual(requestedResource.name);
  });

  it('Getting a presenter, should return that presenter.', async () => {
    const createdIndex = await testDataManager.CreateTestResources();

    const createdResponse = testDataManager.currentResources[createdIndex].created;
    const requestedResource = testDataManager.currentResources[createdIndex].requested;

    expect(createdResponse.bio).toEqual(requestedResource.bio);
    expect(createdResponse.contactInfo).toEqual(requestedResource.contactInfo);
    expect(createdResponse.name).toEqual(requestedResource.name);
  });

  it('Deleting a presenter, should delete that presenter', async () => {
    const createdIndex = await testDataManager.CreateTestResources();

    const createdResponse = testDataManager.currentResources[createdIndex].created;

    await presenterApi.deleteResource(createdResponse.id, true);

    const presenterFromServer = await presenterApi.getResource(createdResponse.id);

    expect(presenterFromServer).toBeUndefined();
  });

  it('Updating a presenter, should return the updated presenter.', async () => {
    const itemIndex = await testDataManager.CreateTestResources();

    const createdResponse = testDataManager.currentResources[itemIndex].created;

    const updatedIndex = await testDataManager.UpdateTestResource(createdResponse.id);

    const requestedUpdate = testDataManager.currentResources[updatedIndex].requested;
    const updatedResponse = testDataManager.currentResources[updatedIndex].created;

    expect(updatedResponse.bio).toEqual(requestedUpdate.bio);
    expect(updatedResponse.contactInfo).toEqual(requestedUpdate.contactInfo);
    expect(updatedResponse.name).toEqual(requestedUpdate.name);
  });

  it('Updating a presenter, and then getting that presenter, should return that presenter', async () => {
    const itemIndex = await testDataManager.CreateTestResources();

    const createdResponse = testDataManager.currentResources[itemIndex].created;

    const updatedIndex = await testDataManager.UpdateTestResource(createdResponse.id);

    const serverPresenter = await presenterApi.getResource(testDataManager.currentResources[updatedIndex].created.id);

    expect(serverPresenter && serverPresenter.bio).toEqual(testDataManager.currentResources[updatedIndex].created.bio);
    expect(serverPresenter && serverPresenter.contactInfo).toEqual(testDataManager.currentResources[updatedIndex].created.contactInfo);
    expect(serverPresenter && serverPresenter.name).toEqual(testDataManager.currentResources[updatedIndex].created.name);
  });

  it('Querying a presenter, should return that matching presenters.', async () => {
    let testIndex = 0;
    for (let index = 0; index < 10; index++) {
      const createdIndex = await testDataManager.CreateTestResources();
      if (index === 5) testIndex = createdIndex;
    }

    const createdResponse = testDataManager.currentResources[testIndex].created;

    const queryResponse = await presenterApi.queryResources(0, 1, createdResponse.name);

    expect(createdResponse.bio).toEqual(queryResponse.records[0].bio);
    expect(createdResponse.contactInfo).toEqual(queryResponse.records[0].contactInfo);
    expect(createdResponse.name).toEqual(queryResponse.records[0].name);
  });
});
