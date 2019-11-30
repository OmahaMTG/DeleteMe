import faker from 'faker';
import { IMeeting } from '../../3_Contracts/IMeeting';
import { IHost } from '../../3_Contracts/IHost';
import { buildResourceAccessor } from '../ResourceAccessor';
import { ITemplate } from '../../3_Contracts/ITemplate';
import { ISponsor } from '../../3_Contracts/ISponsor';
import { IPresenter } from '../../3_Contracts/IPresenter';
import moment from 'moment';

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
const presenterApi = buildResourceAccessor<IPresenter>('/presenter');

const buildTestMeetingRequest = async (): Promise<Omit<IMeeting, 'id'>> => {
  const testHostRequest1 = buildTestHostRequest();
  const testHostResponse1 = await hostApi.createResource(testHostRequest1);

  const testTemplateRequest1 = buildTestTemplateRequest();
  const testTemplateResponse1 = await templateApi.createResource(testTemplateRequest1);

  const testSponsorRequest1 = buildTestSponsorRequest();
  const testSponsorResponse1 = await sponsorApi.createResource(testSponsorRequest1);

  const testSponsorRequest2 = buildTestSponsorRequest();
  const testSponsorResponse2 = await sponsorApi.createResource(testSponsorRequest2);

  const testPresenterRequest1 = buildTestPresenterRequest();
  const testPresenterResponse1 = await presenterApi.createResource(testPresenterRequest1);

  const testPresenterRequest2 = buildTestPresenterRequest();
  const testPresenterResponse2 = await presenterApi.createResource(testPresenterRequest2);

  const testPresenterRequest3 = buildTestPresenterRequest();
  const testPresenterResponse3 = await presenterApi.createResource(testPresenterRequest3);

  const testPresenterRequest4 = buildTestPresenterRequest();
  const testPresenterResponse4 = await presenterApi.createResource(testPresenterRequest4);

  return {
    startTime: moment(faker.date.past()).toISOString(true),
    endTime: moment(faker.date.past()).toISOString(true),
    meetingHostBody: faker.random.words(),
    isDraft: false,
    meetingHostId: testHostResponse1.id,
    publishStartTime: moment(faker.date.past()).toISOString(true),
    title: faker.random.words(),
    meetingPresentations: [
      {
        presentationDetails: faker.random.words(),
        presentationTitle: faker.random.words(),
        vimeoId: faker.random.words(),
        meetingPresentationPresenters: [
          { presenterId: testPresenterResponse1.id, meetingPresentationPresenterBody: faker.random.words() },
          { presenterId: testPresenterResponse2.id, meetingPresentationPresenterBody: faker.random.words() }
        ]
      },
      {
        presentationDetails: faker.random.words(),
        presentationTitle: faker.random.words(),
        vimeoId: faker.random.words(),
        meetingPresentationPresenters: [
          { presenterId: testPresenterResponse3.id, meetingPresentationPresenterBody: faker.random.words() },
          { presenterId: testPresenterResponse4.id, meetingPresentationPresenterBody: faker.random.words() }
        ]
      }
    ],
    meetingSponsors: [
      { sponsorId: testSponsorResponse1.id, meetingSponsorBody: faker.random.words() },
      { sponsorId: testSponsorResponse2.id, meetingSponsorBody: faker.random.words() }
    ],
    tags: ['testTag1', 'testTag2', 'testTag3'],
    templateId: testTemplateResponse1.id,
    vimeoId: faker.random.number().toString()
  };
};

export { buildTestHostRequest, buildTestSponsorRequest, buildTestTemplateRequest, buildTestPresenterRequest, buildTestMeetingRequest };
