import faker from 'faker';
import { IMeeting } from '../../3_Contracts/IMeeting';
import { IHost } from '../../3_Contracts/IHost';
import { buildResourceAccessor } from '../ResourceAccessor';
import { ITemplate } from '../../3_Contracts/ITemplate';
import { ISponsor } from '../../3_Contracts/ISponsor';

const buildTestHostRequest = () => ({
  address: faker.random.words(),
  blurb: faker.random.words(),
  contactInfo: faker.random.words(),
  name: faker.random.words()
});

const buildTestTemplateRequest = () => ({
  body: faker.random.words(),
  name: faker.random.words()
});

const buildTestSponsorRequest = () => ({
  blurb: faker.random.words(),
  contactInfo: faker.random.words(),
  name: faker.random.words(),
  shortBlurb: faker.random.words(),
  url: faker.internet.url()
});

const buildTestPresenterRequest = () => ({
  bio: faker.random.words(),
  contactInfo: faker.random.words(),
  name: faker.random.words()
});

const hostApi = buildResourceAccessor<IHost>('/host');
const templateApi = buildResourceAccessor<ITemplate>('/template');
const sponsorApi = buildResourceAccessor<ISponsor>('/sponsor');

const buildTestMeetingRequest = async (): Promise<Omit<IMeeting, 'id'>> => {
  const testHostRequest1 = buildTestHostRequest();
  const testHostResponse1 = await hostApi.createResource(testHostRequest1);

  const testTemplateRequest1 = buildTestTemplateRequest();
  const testTemplateResponse1 = await templateApi.createResource(testTemplateRequest1);

  const testSponsorRequest1 = buildTestSponsorRequest();
  const testSponsorResponse1 = await sponsorApi.createResource(testSponsorRequest1);

  const testSponsorRequest2 = buildTestSponsorRequest();
  const testSponsorResponse2 = await sponsorApi.createResource(testSponsorRequest2);

  return {
    startTime: faker.date.past().toISOString(),
    endTime: faker.date.future().toISOString(),
    meetingHostBody: faker.random.words(),
    isDraft: false,
    meetingHostId: testHostResponse1.id,
    publishStartTime: faker.date.past().toISOString(),
    title: faker.random.words(),
    meetingPresentations: [
      {
        presentationDetails: faker.random.words(),
        presentationTitle: faker.random.words(),
        vimeoId: faker.random.words(),
        meetingPresentationPresenters: []
      }
    ],
    meetingSponsors: [
      { sponsorId: testSponsorResponse1.id, sponsorMeetingBody: faker.random.words() },
      { sponsorId: testSponsorResponse2.id, sponsorMeetingBody: faker.random.words() }
    ],
    tags: ['testTag1', 'testTag2', 'testTag3'],
    templateId: testTemplateResponse1.id,
    vimeoId: faker.random.number().toString()
  };
};

export { buildTestHostRequest, buildTestSponsorRequest, buildTestTemplateRequest, buildTestPresenterRequest, buildTestMeetingRequest };
