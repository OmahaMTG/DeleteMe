import { buildResourceAccessor } from '../ResourceAccessor';
import { ISponsor } from '../../3_Contracts/ISponsor';
import faker from 'faker';

const buildTestSponsorRequest = () => ({
  blurb: faker.random.words(),
  contactInfo: faker.random.words(),
  name: faker.random.words(),
  shortBlurb: faker.random.words(),
  url: faker.internet.url()
});
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
    for (let index = 0; index < 10; index++) {
      const sponsorCreateRequest = buildTestSponsorRequest();
      const sponsorCreateResponse = await sponsorApi.createResource(sponsorCreateRequest);
      if (index === 5) sponsorQueryTarget = sponsorCreateResponse;
    }

    const queryResponse = await sponsorApi.queryResources(0, 1, sponsorQueryTarget.name);

    expect(queryResponse.records[0]).toEqual(sponsorQueryTarget);
  });
});
