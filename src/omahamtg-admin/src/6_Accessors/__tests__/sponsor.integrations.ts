import { buildResourceAccessor } from '../ResourceAccessor';
import { ISponsor } from '../../3_Contracts/ISponsor';
import faker from 'faker';
import { buildTestDataManager } from './testDataManager';

const sponsorApi = buildResourceAccessor<ISponsor>('/sponsor');
const testDataManager = buildTestDataManager<ISponsor>(
  () => ({
    blurb: faker.random.words(),
    contactInfo: faker.random.words(),
    name: faker.random.words(),
    shortBlurb: faker.random.words(),
    url: faker.internet.url()
  }),
  sponsorApi
);

describe('sponsor API', () => {
  afterAll(async () => {
    testDataManager.CleanAllResources();
  });

  it('Creating a sponsor, should create that sponsor and return a record of that sponsor.', async () => {
    const createdIndex = await testDataManager.CreateTestResources();

    const requestedResource = testDataManager.currentResources[createdIndex].requested;
    const createdResource = testDataManager.currentResources[createdIndex].created;
    const sponsorFromServer = await sponsorApi.getResource(createdResource.id);

    expect(sponsorFromServer).not.toBeUndefined();
    expect(sponsorFromServer && sponsorFromServer.shortBlurb).toEqual(requestedResource.shortBlurb);
    expect(sponsorFromServer && sponsorFromServer.url).toEqual(requestedResource.url);
    expect(sponsorFromServer && sponsorFromServer.blurb).toEqual(requestedResource.blurb);
    expect(sponsorFromServer && sponsorFromServer.contactInfo).toEqual(requestedResource.contactInfo);
    expect(sponsorFromServer && sponsorFromServer.name).toEqual(requestedResource.name);
  });

  it('Getting a sponsor, should return that sponsor.', async () => {
    const createdIndex = await testDataManager.CreateTestResources();

    const createdResponse = testDataManager.currentResources[createdIndex].created;
    const requestedResource = testDataManager.currentResources[createdIndex].requested;

    expect(createdResponse.shortBlurb).toEqual(requestedResource.shortBlurb);
    expect(createdResponse.url).toEqual(requestedResource.url);
    expect(createdResponse.blurb).toEqual(requestedResource.blurb);
    expect(createdResponse.contactInfo).toEqual(requestedResource.contactInfo);
    expect(createdResponse.name).toEqual(requestedResource.name);
  });

  it('Deleting a sponsor, should delete that sponsor', async () => {
    const createdIndex = await testDataManager.CreateTestResources();

    const createdResponse = testDataManager.currentResources[createdIndex].created;

    await sponsorApi.deleteResource(createdResponse.id, true);

    const sponsorFromServer = await sponsorApi.getResource(createdResponse.id);

    expect(sponsorFromServer).toBeUndefined();
  });

  it('Updating a sponsor, should return the updated sponsor.', async () => {
    const itemIndex = await testDataManager.CreateTestResources();

    const createdResponse = testDataManager.currentResources[itemIndex].created;

    const updatedIndex = await testDataManager.UpdateTestResource(createdResponse.id);

    const requestedUpdate = testDataManager.currentResources[updatedIndex].requested;
    const updatedResponse = testDataManager.currentResources[updatedIndex].created;

    expect(updatedResponse.shortBlurb).toEqual(requestedUpdate.shortBlurb);
    expect(updatedResponse.url).toEqual(requestedUpdate.url);
    expect(updatedResponse.blurb).toEqual(requestedUpdate.blurb);
    expect(updatedResponse.contactInfo).toEqual(requestedUpdate.contactInfo);
    expect(updatedResponse.name).toEqual(requestedUpdate.name);
  });

  it('Updating a sponsor, and then getting that sponsor, should return that sponsor', async () => {
    const itemIndex = await testDataManager.CreateTestResources();

    const createdResponse = testDataManager.currentResources[itemIndex].created;

    const updatedIndex = await testDataManager.UpdateTestResource(createdResponse.id);

    const serverSponsor = await sponsorApi.getResource(testDataManager.currentResources[updatedIndex].created.id);

    expect(serverSponsor && serverSponsor.shortBlurb).toEqual(testDataManager.currentResources[updatedIndex].created.shortBlurb);
    expect(serverSponsor && serverSponsor.url).toEqual(testDataManager.currentResources[updatedIndex].created.url);
    expect(serverSponsor && serverSponsor.blurb).toEqual(testDataManager.currentResources[updatedIndex].created.blurb);
    expect(serverSponsor && serverSponsor.contactInfo).toEqual(testDataManager.currentResources[updatedIndex].created.contactInfo);
    expect(serverSponsor && serverSponsor.name).toEqual(testDataManager.currentResources[updatedIndex].created.name);
  });

  it('Querying a sponsor, should return that matching sponsors.', async () => {
    let testIndex = 0;
    for (let index = 0; index < 10; index++) {
      const createdIndex = await testDataManager.CreateTestResources();
      if (index === 5) testIndex = createdIndex;
    }

    const createdResponse = testDataManager.currentResources[testIndex].created;

    const queryResponse = await sponsorApi.queryResources(0, 1, createdResponse.name);

    expect(createdResponse.shortBlurb).toEqual(queryResponse.records[0].shortBlurb);
    expect(createdResponse.url).toEqual(queryResponse.records[0].url);
    expect(createdResponse.blurb).toEqual(queryResponse.records[0].blurb);
    expect(createdResponse.contactInfo).toEqual(queryResponse.records[0].contactInfo);
    expect(createdResponse.name).toEqual(queryResponse.records[0].name);
  });
});
