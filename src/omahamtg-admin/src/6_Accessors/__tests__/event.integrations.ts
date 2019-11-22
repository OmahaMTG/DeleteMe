import { buildResourceAccessor } from '../ResourceAccessor';
import faker from 'faker';
import { IMeeting } from '../../3_Contracts/IMeeting';

const buildTestMeetingRequest = (): Omit<IMeeting, 'id'> => ({
  startTime: faker.date.past().toISOString(),
  endTime: faker.date.future().toISOString(),
  hostBody: faker.random.words(),
  isDraft: false,
  hostId: undefined,
  publishStartTime: faker.date.past().toISOString(),
  title: faker.random.words(),
  presentations: [],
  sponsors: [],
  tags: [],
  templateId: undefined,
  vimeoId: faker.random.number.toString()
});
const hostApi = buildResourceAccessor<IMeeting>('/meeting');

describe('host API', () => {
  it('Creating a host, should create that host and return a record of that host.', async () => {
    const hostCreateRequest = buildTestMeetingRequest();
    const hostCreateResponse = await hostApi.createResource(hostCreateRequest);

    const hostFromServer = await hostApi.getResource(hostCreateResponse.id);

    expect(hostFromServer).toEqual({ ...hostCreateRequest, isDeleted: false, id: expect.any(Number) });
  });
});
