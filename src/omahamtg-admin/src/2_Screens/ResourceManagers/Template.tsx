import React from 'react';
import { ContentList } from './Components/ResourceList';
import Modali, { useModali } from 'modali';
import styles from './ContentManagers.module.scss';
import { Link } from 'react-router-dom';
import { TextInput } from '../../1_Components/Form';
import { MarkdownInput } from '../../1_Components/Form/MarkdownInput';
import { FormButtonGroup } from '../../1_Components/Form/FormButtonGroup';
import { useTemplateManager } from '../../4_Managers/ResourceManager/useTemplateManager';

export const Templates = () => {
  const resourceManager = useTemplateManager();
  const [deleteConfirmationModal, toggleDeleteConfirmationModal] = useModali({
    animated: true,
    title: 'Are you sure?',
    message: 'Deleting this Template will be permanent.',
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
      <ContentList resourceManager={resourceManager} resourceListRenderer={resource => resource.name} resourceUrl="/Admin/Templates" />
      <div className={styles.formContainer}>
        {resourceManager.resourceFormManager.formState.mode === 'edit' && <Link to={`/Admin/Templates/`}>New Template</Link>}
        <form
          onSubmit={event => {
            event.preventDefault();
            resourceManager.resourceFormManager.saveResource();
          }}>
          <h2>Templates</h2>
          <TextInput
            label={'Name'}
            name={'name'}
            value={resourceManager.resourceFormManager.formState.editView.name}
            onChange={resourceManager.resourceFormManager.updateResourceProperty}
          />
          <MarkdownInput
            label={'Body'}
            name={'body'}
            value={resourceManager.resourceFormManager.formState.editView.body}
            onChange={resourceManager.resourceFormManager.updateResourceProperty}
            // extraAction={{ label: 'Populate From Sponsor Record', action: console.log }}
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
