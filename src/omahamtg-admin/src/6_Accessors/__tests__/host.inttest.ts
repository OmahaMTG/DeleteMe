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
  beforeAll(() => {});

  it('Creating a host, should create that host.', async () => {
    await testDataManager.CreateTestResources(1);

    const createdResponse = testDataManager.currentResources[0].created;
    const requestedResource = testDataManager.currentResources[0].requested;

    expect(createdResponse.address).toEqual(requestedResource.address);
    expect(createdResponse.blurb).toEqual(requestedResource.blurb);
    expect(createdResponse.contactInfo).toEqual(requestedResource.contactInfo);
    expect(createdResponse.name).toEqual(requestedResource.name);
  });
});
