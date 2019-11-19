import { IMeeting } from '../../3_Contracts/IMeeting';
import { buildResourceAccessor } from '../../6_Accessors/ResourceAccessor';
import { useResourceManager } from '.';
import { IMeetingSponsor } from '../../3_Contracts/IMeetingSponsor';
const defaultMeeting: Omit<IMeeting, 'id'> = {
  title: '',
  isDraft: false,
  tags: [],
  hostBody: '',
  vimeoId: '',
  sponsors: [{ id: 1, blurb: 'hello 2' }, { id: 1, blurb: 'hello 1' }],
  presentations: []
};

const meetingApi = buildResourceAccessor<IMeeting>('/meeting');

const useMeetingManager = () => {
  const rootResourceManager = useResourceManager(meetingApi, defaultMeeting, '/Admin/Meeting');

  const addBlankSponsor = () => {
    rootResourceManager.setFormState(s => ({ ...s, editView: { ...s.editView, sponsors: [...s.editView.sponsors, { blurb: '' }] } }));
  };

  const removeSponsor = (index: number) => {
    rootResourceManager.setFormState(s => {
      const newSponsors = [...s.editView.sponsors];
      newSponsors.splice(index, 1);
      return { ...s, editView: { ...s.editView, sponsors: newSponsors } };
    });
  };

  // //http://www.typescriptlang.org/docs/handbook/advanced-types.html#index-types
  // const updateByKey = <T, V extends keyof T>(obj: T, key: V, value: T[V]) => {
  //   obj[key] = value;
  //   return obj;
  // };

  const updateSponsorProperty = <K extends keyof IMeetingSponsor>(index: number, changeEvent: { name: K; value: IMeetingSponsor[K] }) => {
    rootResourceManager.setFormState(cur => {
      const updateSponsors = [...cur.editView.sponsors];
      updateSponsors[index][changeEvent.name] = changeEvent.value;

      return {
        ...cur,
        editView: { ...cur.editView, sponsors: updateSponsors }
      };
    });
  };

  return {
    resourceCollectionManager: {
      collectionState: rootResourceManager.resourceCollectionManager.collectionState,
      updateSearchFilter: rootResourceManager.resourceCollectionManager.updateSearchFilter,
      applySearchFilter: rootResourceManager.resourceCollectionManager.applySearchFilter,
      clearSearchFilter: rootResourceManager.resourceCollectionManager.clearSearchFilter,
      loadMoreResources: rootResourceManager.resourceCollectionManager.loadMoreResources,
      isResourceLoaded: rootResourceManager.resourceCollectionManager.isResourceLoaded
    },
    resourceFormManager: {
      deleteResource: rootResourceManager.resourceFormManager.deleteResource,
      saveResource: rootResourceManager.resourceFormManager.saveResource,
      formState: rootResourceManager.resourceFormManager.formState,
      formMessage: rootResourceManager.resourceFormManager.formMessage,
      updateResourceProperty: rootResourceManager.resourceFormManager.updateResourceProperty,
      addBlankSponsor,
      removeSponsor,
      updateSponsorProperty
    }
  };
};

export { useMeetingManager };
