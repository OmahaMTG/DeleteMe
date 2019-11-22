import { buildResourceAccessor } from '../ResourceAccessor';
import { IHost } from '../../3_Contracts/IHost';
import faker from 'faker';

const buildTestHostRequest = () => ({
  address: faker.random.words(),
  blurb: faker.random.words(),
  contactInfo: faker.random.words(),
  name: faker.random.words()
});
const hostApi = buildResourceAccessor<IHost>('/host');

describe('host API', () => {
  it('Creating a host, should create that host and return a record of that host.', async () => {
    const hostCreateRequest = buildTestHostRequest();
    const hostCreateResponse = await hostApi.createResource(hostCreateRequest);

    const hostFromServer = await hostApi.getResource(hostCreateResponse.id);

    expect(hostFromServer).toEqual({ ...hostCreateRequest, isDeleted: false, id: expect.any(Number) });
  });

  it('Getting a host, should return that host.', async () => {
    const hostCreateRequest = buildTestHostRequest();
    const hostCreateResponse = await hostApi.createResource(hostCreateRequest);

    expect(hostCreateResponse).toEqual({ ...hostCreateRequest, isDeleted: false, id: expect.any(Number) });
  });

  it('Deleting a host, should delete that host', async () => {
    const hostCreateRequest = buildTestHostRequest();
    const hostCreateResponse = await hostApi.createResource(hostCreateRequest);

    await hostApi.deleteResource(hostCreateResponse.id, true);

    const hostFromServer = await hostApi.getResource(hostCreateResponse.id);

    expect(hostFromServer).toBeUndefined();
  });

  it('Updating a host, should return the updated host.', async () => {
    const hostCreateRequest = buildTestHostRequest();
    const hostCreateResponse = await hostApi.createResource(hostCreateRequest);

    const hostUpdateRequest = buildTestHostRequest();
    const hostUpdateResponse = await hostApi.updateResource(hostCreateResponse.id, hostUpdateRequest);

    expect(hostUpdateResponse).toEqual({ ...hostUpdateRequest, isDeleted: false, id: expect.any(Number) });
  });

  it('Updating a host, and then getting that host, should return that host', async () => {
    const hostCreateRequest = buildTestHostRequest();
    const hostCreateResponse = await hostApi.createResource(hostCreateRequest);

    const hostUpdateRequest = buildTestHostRequest();
    await hostApi.updateResource(hostCreateResponse.id, hostUpdateRequest);

    const hostFromServer = await hostApi.getResource(hostCreateResponse.id);

    expect(hostFromServer).toEqual({ ...hostUpdateRequest, isDeleted: false, id: expect.any(Number) });
  });

  it('Querying a host, should return that matching hosts.', async () => {
    let hostQueryTarget = buildTestHostRequest();
    for (let index = 0; index < 10; index++) {
      const hostCreateRequest = buildTestHostRequest();
      const hostCreateResponse = await hostApi.createResource(hostCreateRequest);
      if (index === 5) hostQueryTarget = hostCreateResponse;
    }

    const queryResponse = await hostApi.queryResources(0, 1, hostQueryTarget.name);

    expect(queryResponse.records[0]).toEqual(hostQueryTarget);
  });
});
