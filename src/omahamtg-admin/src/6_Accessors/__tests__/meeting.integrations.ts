import { buildResourceAccessor } from '../ResourceAccessor';
import { IMeeting } from '../../3_Contracts/IMeeting';
import { buildTestMeetingRequest } from './testResourceBuilders';

const meetingApi = buildResourceAccessor<IMeeting>('/meeting');

describe('meeting API', () => {
  it('Creating a meeting, should create that meeting and return a record of that meeting.', async () => {
    const meetingCreateRequest = await buildTestMeetingRequest();
    const meetingCreateResponse = await meetingApi.createResource(meetingCreateRequest);

    expect(meetingCreateResponse).toEqual({
      ...meetingCreateRequest,
      isDeleted: false,
      id: expect.any(Number),

      meetingPresentations: meetingCreateRequest.meetingPresentations.map(m => ({ ...m, presentationId: expect.any(Number) }))
    });
  });

  it('Getting a meeting, should return that meeting.', async () => {
    const meetingCreateRequest = await buildTestMeetingRequest();
    const meetingCreateResponse = await meetingApi.createResource(meetingCreateRequest);

    const meetingFromServer = await meetingApi.getResource(meetingCreateResponse.id);

    expect(meetingFromServer).toEqual(meetingCreateResponse);
  });

  it('Deleting a meeting, should delete that meeting', async () => {
    const meetingCreateRequest = await buildTestMeetingRequest();
    const meetingCreateResponse = await meetingApi.createResource(meetingCreateRequest);

    await meetingApi.deleteResource(meetingCreateResponse.id, true);

    const hostFromServer = await meetingApi.getResource(meetingCreateResponse.id);

    expect(hostFromServer).toBeUndefined();
  });

  it('Querying a meeting, should return that matching meetings.', async () => {
    let meetingQueryTarget = await buildTestMeetingRequest();
    let queryTargetId = 0;
    for (let index = 0; index < 10; index++) {
      const meetingCreateRequest = await buildTestMeetingRequest();
      const meetingCreateResponse = await meetingApi.createResource(meetingCreateRequest);
      if (index === 5) {
        meetingQueryTarget = meetingCreateResponse;
        queryTargetId = meetingCreateResponse.id;
      }
    }

    const queryResponse = await meetingApi.queryResources(0, 50, meetingQueryTarget.title);
    queryResponse.records.find(meeting => meeting.id === queryTargetId);
    expect(queryResponse.records.find(meeting => meeting.id === queryTargetId)).toEqual(meetingQueryTarget);
  });
});
