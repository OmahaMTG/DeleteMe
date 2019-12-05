import { IResourceManager } from './contracts/IResourceManager';
import { buildResourceAccessor } from '../../6_Accessors/ResourceAccessor';
import { IPresenter } from '../../3_Contracts/IPresenter';
import { useResourceManager } from '.';
const defaultPresenter: Omit<IPresenter, 'id'> = {
  name: '',
  bio: '',
  contactInfo: ''
};

const sponsorApi = buildResourceAccessor<IPresenter>('/presenter');

const usePresenterManager = (): IResourceManager<IPresenter> => {
  const rootResourceManager = useResourceManager(sponsorApi, defaultPresenter, '/Admin/Presenters');

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

export { usePresenterManager };
