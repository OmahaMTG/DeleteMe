import { buildResourceAccessor } from '../ResourceAccessor';
import { ISponsor } from '../../3_Contracts/ISponsor';
import { buildTestSponsorRequest } from './testResourceBuilders';

const sponsorApi = buildResourceAccessor<ISponsor>('/sponsor');

describe('sponsor API', () => {
  it('Creating a sponsor, should create that sponsor and return a record of that sponsor.', async () => {
    const sponsorCreateRequest = buildTestSponsorRequest();
    const sponsorCreateResponse = await sponsorApi.createResource(sponsorCreateRequest);

    const sponsorFromServer = await sponsorApi.getResource(sponsorCreateResponse.id);

    expect(sponsorFromServer).toEqual({ ...sponsorCreateRequest, isDeleted: false, id: expect.any(Number) });
  });

  it('Getting a sponsor, should return that sponsor.', async () => {
    const sponsorCreateRequest = buildTestSponsorRequest();
    const sponsorCreateResponse = await sponsorApi.createResource(sponsorCreateRequest);

    expect(sponsorCreateResponse).toEqual({ ...sponsorCreateRequest, isDeleted: false, id: expect.any(Number) });
  });

  it('Deleting a sponsor, should delete that sponsor', async () => {
    const sponsorCreateRequest = buildTestSponsorRequest();
    const sponsorCreateResponse = await sponsorApi.createResource(sponsorCreateRequest);

    await sponsorApi.deleteResource(sponsorCreateResponse.id, true);

    const sponsorFromServer = await sponsorApi.getResource(sponsorCreateResponse.id);

    expect(sponsorFromServer).toBeUndefined();
  });

  it('Updating a sponsor, should return the updated sponsor.', async () => {
    const sponsorCreateRequest = buildTestSponsorRequest();
    const sponsorCreateResponse = await sponsorApi.createResource(sponsorCreateRequest);

    const sponsorUpdateRequest = buildTestSponsorRequest();
    const sponsorUpdateResponse = await sponsorApi.updateResource(sponsorCreateResponse.id, sponsorUpdateRequest);

    expect(sponsorUpdateResponse).toEqual({ ...sponsorUpdateRequest, isDeleted: false, id: expect.any(Number) });
  });

  it('Updating a sponsor, and then getting that sponsor, should return that sponsor', async () => {
    const sponsorCreateRequest = buildTestSponsorRequest();
    const sponsorCreateResponse = await sponsorApi.createResource(sponsorCreateRequest);

    const sponsorUpdateRequest = buildTestSponsorRequest();
    await sponsorApi.updateResource(sponsorCreateResponse.id, sponsorUpdateRequest);

    const sponsorFromServer = await sponsorApi.getResource(sponsorCreateResponse.id);

    expect(sponsorFromServer).toEqual({ ...sponsorUpdateRequest, isDeleted: false, id: expect.any(Number) });
  });

  it('Querying a sponsor, should return that matching sponsors.', async () => {
    let sponsorQueryTarget = buildTestSponsorRequest();
    let queryTargetId = 0;
    for (let index = 0; index < 10; index++) {
      const sponsorCreateRequest = buildTestSponsorRequest();
      const sponsorCreateResponse = await sponsorApi.createResource(sponsorCreateRequest);
      if (index === 5) {
        sponsorQueryTarget = sponsorCreateResponse;
        queryTargetId = sponsorCreateResponse.id;
      }
    }

    const queryResponse = await sponsorApi.queryResources(0, 50, sponsorQueryTarget.name);
    queryResponse.records.find(host => host.id === queryTargetId);
    expect(queryResponse.records.find(host => host.id === queryTargetId)).toEqual(sponsorQueryTarget);
  });
});
