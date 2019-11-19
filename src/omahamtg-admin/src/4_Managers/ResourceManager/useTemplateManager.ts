import { IResourceManager } from './contracts/IResourceManager';
import { buildResourceAccessor } from '../../6_Accessors/ResourceAccessor';
import { ITemplate } from '../../3_Contracts/ITemplate';
import { useResourceManager } from '.';
const defaultTemplate: Omit<ITemplate, 'id'> = {
  name: '',
  body: ''
};

const sponsorApi = buildResourceAccessor<ITemplate>('/template');

const useTemplateManager = (): IResourceManager<ITemplate> => {
  const rootResourceManager = useResourceManager(sponsorApi, defaultTemplate, '/Admin/Templates');

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

export { useTemplateManager };
