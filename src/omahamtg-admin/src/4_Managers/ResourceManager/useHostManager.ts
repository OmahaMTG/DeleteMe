import { IResourceManager } from './contracts/IResourceManager';
import { buildResourceAccessor } from '../../6_Accessors/ResourceAccessor';
import { IHost } from '../../3_Contracts/IHost';
import { useResourceManager } from '.';

const defaultHost: Omit<IHost, 'id'> = {
  name: '',
  blurb: '',
  contactInfo: '',
  address: ''
};

const sponsorApi = buildResourceAccessor<IHost>('/host');

const useHostManager = (): IResourceManager<IHost> => {
  const rootResourceManager = useResourceManager(sponsorApi, defaultHost, '/Admin/Hosts');

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

export { useHostManager };
