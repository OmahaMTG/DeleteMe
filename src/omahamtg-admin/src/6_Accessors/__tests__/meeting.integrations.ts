import { buildResourceAccessor } from '../ResourceAccessor';
import faker from 'faker';
import { IMeeting } from '../../3_Contracts/IMeeting';
import { IHost } from '../../3_Contracts/IHost';

const meetingApi = buildResourceAccessor<IMeeting>('/meeting');
const hostApi = buildResourceAccessor<IHost>('/host');

const buildTestHostRequest = () => ({
  address: faker.random.words(),
  blurb: faker.random.words(),
  contactInfo: faker.random.words(),
  name: faker.random.words()
});

const buildTestMeetingRequest = async (): Promise<Omit<IMeeting, 'id'>> => {
  const testHostRequest1 = buildTestHostRequest();
  const testHostResponse1 = await hostApi.createResource(testHostRequest1);

  return {
    startTime: faker.date.past().toISOString(),
    endTime: faker.date.future().toISOString(),
    meetingHostBody: faker.random.words(),
    isDraft: false,
    meetingHostId: testHostResponse1.id,
    publishStartTime: faker.date.past().toISOString(),
    title: faker.random.words(),
    meetingPresentations: [],
    meetingSponsors: [],
    tags: ['testTag1', 'testTag2', 'testTag3'],
    templateId: null,
    vimeoId: faker.random.number().toString()
  };
};

describe('meeting API', () => {
  it('Creating a meeting, should create that meeting and return a record of that meeting.', async () => {
    const meetingCreateRequest = await buildTestMeetingRequest();
    const meetingCreateResponse = await meetingApi.createResource(meetingCreateRequest);

    //const hostFromServer = await hostApi.getResource(hostCreateResponse.id);

    expect(meetingCreateResponse).toEqual({
      ...meetingCreateRequest,
      isDeleted: false,
      id: expect.any(Number)
    });

    console.log(JSON.stringify(meetingCreateResponse));
  });
});
