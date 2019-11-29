import { buildResourceAccessor } from '../ResourceAccessor';
import { IMeeting } from '../../3_Contracts/IMeeting';
import { buildTestMeetingRequest } from './testResourceBuilders';

const meetingApi = buildResourceAccessor<IMeeting>('/meeting');

describe('meeting API', () => {
  it('Creating a meeting, should create that meeting and return a record of that meeting.', async () => {
    const meetingCreateRequest = await buildTestMeetingRequest();
    const meetingCreateResponse = await meetingApi.createResource(meetingCreateRequest);

    //const hostFromServer = await hostApi.getResource(hostCreateResponse.id);

    expect(meetingCreateResponse).toEqual({
      ...meetingCreateRequest,
      isDeleted: false,
      id: expect.any(Number),
      meetingPresentations: meetingCreateRequest.meetingPresentations.map(m => ({ ...m, presentationId: expect.any(Number) }))
    });

    console.log(JSON.stringify(meetingCreateResponse));
  });
});
