import React from 'react';
import { ContentList } from './Components/ResourceList';
import Modali, { useModali } from 'modali';
import styles from './ContentManagers.module.scss';
import { Link } from 'react-router-dom';
import { TextInput } from '../../1_Components/Form';
import { MarkdownInput } from '../../1_Components/Form/MarkdownInput';
import { TextAreaInput } from '../../1_Components/Form/TextAreaInput';
import { FormButtonGroup } from '../../1_Components/Form/FormButtonGroup';
import { usePresenterManager } from '../../4_Managers/ResourceManager/usePresenterManager';

export const Presenters = () => {
  const resourceManager = usePresenterManager();
  const [deleteConfirmationModal, toggleDeleteConfirmationModal] = useModali({
    animated: true,
    title: 'Are you sure?',
    message: 'Deleting this Presenter will be permanent.',
    buttons: [
      <Modali.Button label="Cancel" isStyleCancel onClick={() => toggleDeleteConfirmationModal()} />,
      <Modali.Button
        label="Delete"
        isStyleDestructive
        onClick={() => {
          resourceManager.resourceFormManager.deleteResource();
          toggleDeleteConfirmationModal();
        }}
      />
    ]
  });
  return (
    <>
      <ContentList resourceManager={resourceManager} resourceListRenderer={resource => resource.name} resourceUrl="/Admin/Presenters" />
      <div className={styles.formContainer}>
        {resourceManager.resourceFormManager.formState.mode === 'edit' && <Link to={`/Admin/Presenters/`}>New Presenter</Link>}
        <form
          onSubmit={event => {
            event.preventDefault();
            resourceManager.resourceFormManager.saveResource();
          }}>
          <h2>Presenters</h2>
          <TextInput
            label={'Name'}
            name={'name'}
            value={resourceManager.resourceFormManager.formState.editView.name}
            onChange={resourceManager.resourceFormManager.updateResourceProperty}
          />
          <MarkdownInput
            label={'Bio'}
            name={'bio'}
            value={resourceManager.resourceFormManager.formState.editView.bio}
            onChange={resourceManager.resourceFormManager.updateResourceProperty}
          />
          <TextAreaInput
            rows={5}
            label={'Contact Info'}
            name={'contactInfo'}
            value={resourceManager.resourceFormManager.formState.editView.contactInfo}
            onChange={resourceManager.resourceFormManager.updateResourceProperty}
          />
          <FormButtonGroup
            onClickCancelButton={console.log}
            onClickDeleteButton={toggleDeleteConfirmationModal}
            onClickSaveButton={resourceManager.resourceFormManager.saveResource}
            disabled={resourceManager.resourceFormManager.formState.state === 'saving'}
          />
        </form>
        <div style={{ color: 'red' }}>{resourceManager.resourceFormManager.formMessage}</div>
        <div style={{ color: 'red' }}>{resourceManager.resourceFormManager.formState.mode}</div>
        <Modali.Modal {...deleteConfirmationModal}>Delete {resourceManager.resourceFormManager.formState.editView.name}?</Modali.Modal>
      </div>
    </>
  );
};
