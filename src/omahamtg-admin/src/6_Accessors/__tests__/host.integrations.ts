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
  afterEach(async () => {
    testDataManager.CleanAllResources();
  });

  it('Creating a host, should create that host.', async () => {
    await testDataManager.CreateTestResources();

    const createdResponse = testDataManager.currentResources[0].created;
    const requestedResource = testDataManager.currentResources[0].requested;

    expect(createdResponse.address).toEqual(requestedResource.address);
    expect(createdResponse.blurb).toEqual(requestedResource.blurb);
    expect(createdResponse.contactInfo).toEqual(requestedResource.contactInfo);
    expect(createdResponse.name).toEqual(requestedResource.name);

    const hostFromServer = await hostApi.getResource(createdResponse.id);

    expect(hostFromServer).not.toBeUndefined();

    expect(hostFromServer && hostFromServer.address).toEqual(requestedResource.address);
    expect(hostFromServer && hostFromServer.blurb).toEqual(requestedResource.blurb);
    expect(hostFromServer && hostFromServer.contactInfo).toEqual(requestedResource.contactInfo);
    expect(hostFromServer && hostFromServer.name).toEqual(requestedResource.name);
  });

  it('Deleting a host, should delete that host', async () => {
    await testDataManager.CreateTestResources(1);

    const createdResponse = testDataManager.currentResources[0].created;

    await hostApi.deleteResource(createdResponse.id, true);

    const hostFromServer = await hostApi.getResource(createdResponse.id);

    expect(hostFromServer).toBeUndefined();
  });

  it('Updating a host, should update that host.', async () => {
    await testDataManager.CreateTestResources(1);

    const createdResponse = testDataManager.currentResources[0].created;

    const updatedResponse = await testDataManager.UpdateResource(createdResponse.id);

    const requestedUpdate = testDataManager.currentResources[0].requested;

    expect(updatedResponse.address).toEqual(requestedUpdate.address);
    expect(updatedResponse.blurb).toEqual(requestedUpdate.blurb);
    expect(updatedResponse.contactInfo).toEqual(requestedUpdate.contactInfo);
    expect(updatedResponse.name).toEqual(requestedUpdate.name);

    const hostFromServer = await hostApi.getResource(createdResponse.id);

    expect(hostFromServer).not.toBeUndefined();

    expect(hostFromServer && hostFromServer.address).toEqual(requestedUpdate.address);
    expect(hostFromServer && hostFromServer.blurb).toEqual(requestedUpdate.blurb);
    expect(hostFromServer && hostFromServer.contactInfo).toEqual(requestedUpdate.contactInfo);
    expect(hostFromServer && hostFromServer.name).toEqual(requestedUpdate.name);
  });
});
