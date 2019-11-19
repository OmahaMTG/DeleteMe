import { IResourceAccessor } from '../ResourceAccessor/IResourceAccessor';
import { resourceBase } from '../../3_Contracts';

export const buildTestDataManager = <TModel extends resourceBase>(
  createRequestCreator: () => Omit<TModel, 'id'>,
  resourceAccessor: IResourceAccessor<TModel>
) => {
  const currentResources: {
    requested: Omit<TModel, 'id'>;
    created: TModel;
    isDeleted: boolean;
  }[] = [];

  const CreateTestResources = async (count: number) => {
    for (let index = 0; index < count; index++) {
      const request = createRequestCreator();
      const apiResponse = await resourceAccessor.createResource(request);
      currentResources.push({ requested: request, created: apiResponse, isDeleted: false });
    }
  };

  const DeleteResource = async (idToDelete: number, perm: boolean) => {
    await resourceAccessor.deleteResource(idToDelete, perm);
    var deletedIndex = currentResources.findIndex(x => x.created.id === idToDelete);
    currentResources[deletedIndex] = { ...currentResources[deletedIndex], isDeleted: true };
  };

  const UpdateResource = async (idToUpdate: number, updatedResource: TModel) => {
    const updateResult = await resourceAccessor.updateResource(idToUpdate, updatedResource);
    var updatedIndex = currentResources.findIndex(x => x.created.id === idToUpdate);
    currentResources[updatedIndex] = { ...currentResources[updatedIndex], created: updateResult };
  };

  const CleanAllResources = async () => {
    const deletePromises = this.resources.map(resource => resourceAccessor.deleteResource(resource.created.id, true));

    await Promise.all(deletePromises);
    this.resources = [];
  };

  return { CreateTestResources, currentResources, CleanAllResources, DeleteResource, UpdateResource };
};
