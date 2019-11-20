import { IResourceAccessor } from '../ResourceAccessor/IResourceAccessor';
import { resourceBase } from '../../3_Contracts';

export const buildTestDataManager = <TModel extends resourceBase>(
  createRequestCreator: () => Omit<TModel, 'id'>,
  resourceAccessor: IResourceAccessor<TModel>
) => {
  var currentResources: {
    requested: Omit<TModel, 'id'>;
    created: TModel;
    isDeleted: boolean;
  }[] = [];

  const CreateTestResources = async () => {
    const request = createRequestCreator();
    const apiResponse = await resourceAccessor.createResource(request);
    currentResources.push({ requested: request, created: apiResponse, isDeleted: false });
    return currentResources.findIndex(r => r.created.id === apiResponse.id);
  };

  const DeleteTestResource = async (idToDelete: number, perm: boolean) => {
    await resourceAccessor.deleteResource(idToDelete, perm);
    var deletedIndex = currentResources.findIndex(x => x.created.id === idToDelete);
    currentResources[deletedIndex] = { ...currentResources[deletedIndex], isDeleted: true };
  };

  const UpdateTestResource = async (idToUpdate: number) => {
    const updatedResource = createRequestCreator();
    const updateResult = await resourceAccessor.updateResource(idToUpdate, updatedResource);
    var updatedIndex = currentResources.findIndex(x => x.created.id === idToUpdate);
    currentResources[updatedIndex] = { ...currentResources[updatedIndex], created: updateResult };
    return updatedIndex;
  };

  const CleanAllResources = async () => {
    const deletePromises = currentResources.map(resource => resourceAccessor.deleteResource(resource.created.id, true));
    await Promise.all(deletePromises);
    currentResources = [];
  };

  return { CreateTestResources, currentResources, CleanAllResources, DeleteTestResource, UpdateTestResource };
};
