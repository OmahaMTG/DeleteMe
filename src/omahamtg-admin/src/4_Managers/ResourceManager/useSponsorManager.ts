import { IResourceManager } from './contracts/IResourceManager';
import { ISponsor } from '../../3_Contracts/ISponsor';
import { buildResourceAccessor } from '../../6_Accessors/ResourceAccessor';
import { useResourceManager } from '.';
const defaultSponsor: Omit<ISponsor, 'id'> = {
  name: '',
  blurb: '',
  contactInfo: '',
  shortBlurb: '',
  url: ''
};

const sponsorApi = buildResourceAccessor<ISponsor>('/sponsor');

const useSponsorManager = (): IResourceManager<ISponsor> => {
  const rootResourceManager = useResourceManager(sponsorApi, defaultSponsor, '/Admin/Sponsor');

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
      updateResourceProperty: rootResourceManager.resourceFormManager.updateResourceProperty
    }
  };
};

export { useSponsorManager };
