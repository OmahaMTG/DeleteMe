import { useState } from 'react';
import { IApiService } from '../../services/serviceContracts';
import { entityBase, EditorState, entityEditor, idlessEntity } from './ContentManagerModels';

export const useEntityEditor = <T extends entityBase>(apiService: IApiService<T>, defaultEntity: idlessEntity): entityEditor<T> => {
  const defaultEditorState: EditorState<T> = {
    editId: 0,
    editView: defaultEntity,
    mode: 'new',
    editorMessage: ''
  };

  const [formState, setFormState] = useState<EditorState<T>>(defaultEditorState);

  //let { id } = useParams();

  // useEffect(() => {
  //   if (typeof id !== 'undefined') {
  //     const intId = parseInt(id);
  //     const sponsor = sponsorListState.resultSet.records.find(s => s.id === intId);
  //     if (sponsor) {
  //       setSponsorFormState(cur => ({ ...cur, editView: sponsor, editId: intId, mode: 'edit' }));
  //     }
  //   } else {
  //     setSponsorFormState(defaultEditorState);
  //   }
  // }, [id, sponsorListState.resultSet.records]);

  const updateEntityContent = (key: string, value: string | boolean) => {
    setFormState(current => ({ ...current, editView: ({ ...current.editView, [key]: value } as unknown) as Pick<T, keyof T> }));
  };

  const saveEntity = async () => {
    if (formState.mode === 'new') {
      const newSponsor = await apiService.createEntity(formState.editView);
      setFormState(cur => ({ ...cur, editId: newSponsor.id, mode: 'edit' }));
    }

    if (formState.mode === 'edit') {
      await apiService.updateEntity(formState.editId, formState.editView);
    }
    setFormMessage(`Saved Sponsor`);
  };

  const deleteEntity = async () => {
    // const deletes = sponsorListState.resultSet.records.map(s => Api.deleteSponsor(s.id));

    // await Promise.all(deletes);
    await apiService.deleteEntity(formState.editId, false);
    setFormState(cur => defaultEditorState);
    setFormMessage(`Deleted Sponsor`);
  };

  const setFormMessage = (message: string) => {
    setFormState(cur => ({ ...cur, editorMessage: message }));
    setTimeout(() => setFormState(cur => ({ ...cur, editorMessage: '' })), 2500);
  };

  return {
    updateEntityContent,
    saveEntity,
    deleteEntity,
    formState
  };
};
