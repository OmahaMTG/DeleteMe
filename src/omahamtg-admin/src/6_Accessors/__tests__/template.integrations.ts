import { buildResourceAccessor } from '../ResourceAccessor';
import { ITemplate } from '../../3_Contracts/ITemplate';
import faker from 'faker';

const buildTestTemplateRequest = () => ({
  body: faker.random.words(),
  name: faker.random.words()
});
const templateApi = buildResourceAccessor<ITemplate>('/template');

describe('template API', () => {
  it('Creating a template, should create that template and return a record of that template.', async () => {
    const templateCreateRequest = buildTestTemplateRequest();
    const templateCreateResponse = await templateApi.createResource(templateCreateRequest);

    const templateFromServer = await templateApi.getResource(templateCreateResponse.id);

    expect(templateFromServer).toEqual({ ...templateCreateRequest, isDeleted: false, id: expect.any(Number) });
  });

  it('Getting a template, should return that template.', async () => {
    const templateCreateRequest = buildTestTemplateRequest();
    const templateCreateResponse = await templateApi.createResource(templateCreateRequest);

    expect(templateCreateResponse).toEqual({ ...templateCreateRequest, isDeleted: false, id: expect.any(Number) });
  });

  it('Deleting a template, should delete that template', async () => {
    const templateCreateRequest = buildTestTemplateRequest();
    const templateCreateResponse = await templateApi.createResource(templateCreateRequest);

    await templateApi.deleteResource(templateCreateResponse.id, true);

    const templateFromServer = await templateApi.getResource(templateCreateResponse.id);

    expect(templateFromServer).toBeUndefined();
  });

  it('Updating a template, should return the updated template.', async () => {
    const templateCreateRequest = buildTestTemplateRequest();
    const templateCreateResponse = await templateApi.createResource(templateCreateRequest);

    const templateUpdateRequest = buildTestTemplateRequest();
    const templateUpdateResponse = await templateApi.updateResource(templateCreateResponse.id, templateUpdateRequest);

    expect(templateUpdateResponse).toEqual({ ...templateUpdateRequest, isDeleted: false, id: expect.any(Number) });
  });

  it('Updating a template, and then getting that template, should return that template', async () => {
    const templateCreateRequest = buildTestTemplateRequest();
    const templateCreateResponse = await templateApi.createResource(templateCreateRequest);

    const templateUpdateRequest = buildTestTemplateRequest();
    await templateApi.updateResource(templateCreateResponse.id, templateUpdateRequest);

    const templateFromServer = await templateApi.getResource(templateCreateResponse.id);

    expect(templateFromServer).toEqual({ ...templateUpdateRequest, isDeleted: false, id: expect.any(Number) });
  });

  it('Querying a template, should return that matching templates.', async () => {
    let templateQueryTarget = buildTestTemplateRequest();
    for (let index = 0; index < 10; index++) {
      const templateCreateRequest = buildTestTemplateRequest();
      const templateCreateResponse = await templateApi.createResource(templateCreateRequest);
      if (index === 5) templateQueryTarget = templateCreateResponse;
    }

    const queryResponse = await templateApi.queryResources(0, 1, templateQueryTarget.name);

    expect(queryResponse.records[0]).toEqual(templateQueryTarget);
  });
});
