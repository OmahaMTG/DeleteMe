import { buildResourceAccessor } from '../ResourceAccessor';
import { IPresenter } from '../../3_Contracts/IPresenter';
import { buildTestPresenterRequest } from './testResourceBuilders';

const presenterApi = buildResourceAccessor<IPresenter>('/presenter');

describe('presenter API', () => {
  it('Creating a presenter, should create that presenter and return a record of that presenter.', async () => {
    const presenterCreateRequest = buildTestPresenterRequest();
    const presenterCreateResponse = await presenterApi.createResource(presenterCreateRequest);

    const presenterFromServer = await presenterApi.getResource(presenterCreateResponse.id);

    expect(presenterFromServer).toEqual({ ...presenterCreateRequest, isDeleted: false, id: expect.any(Number), omahaMtgUserId: null });
  });

  it('Getting a presenter, should return that presenter.', async () => {
    const presenterCreateRequest = buildTestPresenterRequest();
    const presenterCreateResponse = await presenterApi.createResource(presenterCreateRequest);

    expect(presenterCreateResponse).toEqual({ ...presenterCreateRequest, isDeleted: false, id: expect.any(Number), omahaMtgUserId: null });
  });

  it('Deleting a presenter, should delete that presenter', async () => {
    const presenterCreateRequest = buildTestPresenterRequest();
    const presenterCreateResponse = await presenterApi.createResource(presenterCreateRequest);

    await presenterApi.deleteResource(presenterCreateResponse.id, true);

    const presenterFromServer = await presenterApi.getResource(presenterCreateResponse.id);

    expect(presenterFromServer).toBeUndefined();
  });

  it('Updating a presenter, should return the updated presenter.', async () => {
    const presenterCreateRequest = buildTestPresenterRequest();
    const presenterCreateResponse = await presenterApi.createResource(presenterCreateRequest);

    const presenterUpdateRequest = buildTestPresenterRequest();
    const presenterUpdateResponse = await presenterApi.updateResource(presenterCreateResponse.id, presenterUpdateRequest);

    expect(presenterUpdateResponse).toEqual({ ...presenterUpdateRequest, isDeleted: false, id: expect.any(Number), omahaMtgUserId: null });
  });

  it('Updating a presenter, and then getting that presenter, should return that presenter', async () => {
    const presenterCreateRequest = buildTestPresenterRequest();
    const presenterCreateResponse = await presenterApi.createResource(presenterCreateRequest);

    const presenterUpdateRequest = buildTestPresenterRequest();
    await presenterApi.updateResource(presenterCreateResponse.id, presenterUpdateRequest);

    const presenterFromServer = await presenterApi.getResource(presenterCreateResponse.id);

    expect(presenterFromServer).toEqual({ ...presenterUpdateRequest, isDeleted: false, id: expect.any(Number), omahaMtgUserId: null });
  });

  it('Querying a presenter, should return that matching presenters.', async () => {
    let presenterQueryTarget = buildTestPresenterRequest();
    let queryTargetId = 0;
    for (let index = 0; index < 10; index++) {
      const presenterCreateRequest = buildTestPresenterRequest();
      const presenterCreateResponse = await presenterApi.createResource(presenterCreateRequest);
      if (index === 5) {
        presenterQueryTarget = presenterCreateResponse;
        queryTargetId = presenterCreateResponse.id;
      }
    }

    const queryResponse = await presenterApi.queryResources(0, 50, presenterQueryTarget.name);

    queryResponse.records.find(host => host.id === queryTargetId);
    expect(queryResponse.records.find(host => host.id === queryTargetId)).toEqual(presenterQueryTarget);
  });
});
