import { buildResourceAccessor } from '../ResourceAccessor';
import { IHost } from '../../3_Contracts/IHost';
import faker from 'faker';
import { buildTestDataManager } from './testDataManager';

const hostApi = buildResourceAccessor<IHost>('/host');
const testDataManager = buildTestDataManager<IHost>(
  () => ({
    address: faker.random.words(),
    blurb: faker.random.words(),
    contactInfo: faker.random.words(),
    name: faker.random.words()
  }),
  hostApi
);

describe('host API', () => {
  afterAll(async () => {
    testDataManager.CleanAllResources();
  });

  it('Creating a host, should create that host and return a record of that host.', async () => {
    const createdIndex = await testDataManager.CreateTestResources();

    const requestedResource = testDataManager.currentResources[createdIndex].requested;
    const createdResource = testDataManager.currentResources[createdIndex].created;
    const hostFromServer = await hostApi.getResource(createdResource.id);

    expect(hostFromServer).not.toBeUndefined();
    expect(hostFromServer && hostFromServer.address).toEqual(requestedResource.address);
    expect(hostFromServer && hostFromServer.blurb).toEqual(requestedResource.blurb);
    expect(hostFromServer && hostFromServer.contactInfo).toEqual(requestedResource.contactInfo);
    expect(hostFromServer && hostFromServer.name).toEqual(requestedResource.name);
  });

  it('Getting a host, should return that host.', async () => {
    const createdIndex = await testDataManager.CreateTestResources();

    const createdResponse = testDataManager.currentResources[createdIndex].created;
    const requestedResource = testDataManager.currentResources[createdIndex].requested;

    expect(createdResponse.address).toEqual(requestedResource.address);
    expect(createdResponse.blurb).toEqual(requestedResource.blurb);
    expect(createdResponse.contactInfo).toEqual(requestedResource.contactInfo);
    expect(createdResponse.name).toEqual(requestedResource.name);
  });

  it('Deleting a host, should delete that host', async () => {
    const createdIndex = await testDataManager.CreateTestResources();

    const createdResponse = testDataManager.currentResources[createdIndex].created;

    await hostApi.deleteResource(createdResponse.id, true);

    const hostFromServer = await hostApi.getResource(createdResponse.id);

    expect(hostFromServer).toBeUndefined();
  });

  it('Updating a host, should return the updated host.', async () => {
    const itemIndex = await testDataManager.CreateTestResources();

    const createdResponse = testDataManager.currentResources[itemIndex].created;

    const updatedIndex = await testDataManager.UpdateTestResource(createdResponse.id);

    const requestedUpdate = testDataManager.currentResources[updatedIndex].requested;
    const updatedResponse = testDataManager.currentResources[updatedIndex].created;

    expect(updatedResponse.address).toEqual(requestedUpdate.address);
    expect(updatedResponse.blurb).toEqual(requestedUpdate.blurb);
    expect(updatedResponse.contactInfo).toEqual(requestedUpdate.contactInfo);
    expect(updatedResponse.name).toEqual(requestedUpdate.name);
  });

  it('Updating a host, and then getting that host, should return that host', async () => {
    const itemIndex = await testDataManager.CreateTestResources();

    const createdResponse = testDataManager.currentResources[itemIndex].created;

    const updatedIndex = await testDataManager.UpdateTestResource(createdResponse.id);

    const serverHost = await hostApi.getResource(testDataManager.currentResources[updatedIndex].created.id);

    expect(serverHost && serverHost.address).toEqual(testDataManager.currentResources[updatedIndex].created.address);
    expect(serverHost && serverHost.blurb).toEqual(testDataManager.currentResources[updatedIndex].created.blurb);
    expect(serverHost && serverHost.contactInfo).toEqual(testDataManager.currentResources[updatedIndex].created.contactInfo);
    expect(serverHost && serverHost.name).toEqual(testDataManager.currentResources[updatedIndex].created.name);
  });

  it('Querying a host, should return that matching hosts.', async () => {
    let testIndex = 0;
    for (let index = 0; index < 10; index++) {
      const createdIndex = await testDataManager.CreateTestResources();
      if (index === 5) testIndex = createdIndex;
    }

    const createdResponse = testDataManager.currentResources[testIndex].created;

    const queryResponse = await hostApi.queryResources(0, 1, createdResponse.name);

    expect(createdResponse.address).toEqual(queryResponse.records[0].address);
    expect(createdResponse.blurb).toEqual(queryResponse.records[0].blurb);
    expect(createdResponse.contactInfo).toEqual(queryResponse.records[0].contactInfo);
    expect(createdResponse.name).toEqual(queryResponse.records[0].name);
  });
});
