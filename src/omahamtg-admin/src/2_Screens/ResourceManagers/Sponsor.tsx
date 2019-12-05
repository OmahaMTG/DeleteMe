import React from 'react';
import { ContentList } from './Components/ResourceList';
import Modali, { useModali } from 'modali';
import styles from './ContentManagers.module.scss';
import { Link } from 'react-router-dom';
import { TextInput } from '../../1_Components/Form';
import { MarkdownInput } from '../../1_Components/Form/MarkdownInput';
import { TextAreaInput } from '../../1_Components/Form/TextAreaInput';
import { FormButtonGroup } from '../../1_Components/Form/FormButtonGroup';
import { useSponsorManager } from '../../4_Managers/ResourceManager/useSponsorManager';

export const Sponsors = () => {
  const sponsorManager = useSponsorManager();
  const [deleteConfirmationModal, toggleDeleteConfirmationModal] = useModali({
    animated: true,
    title: 'Are you sure?',
    message: 'Deleting this Sponsor will be permanent.',
    buttons: [
      <Modali.Button label="Cancel" isStyleCancel onClick={() => toggleDeleteConfirmationModal()} />,
      <Modali.Button
        label="Delete"
        isStyleDestructive
        onClick={() => {
          sponsorManager.resourceFormManager.deleteResource();
          toggleDeleteConfirmationModal();
        }}
      />
    ]
  });
  return (
    <>
      <ContentList resourceManager={sponsorManager} resourceListRenderer={resource => resource.name} resourceUrl="/Admin/Sponsor" />
      <div className={styles.formContainer}>
        {sponsorManager.resourceFormManager.formState.mode === 'edit' && <Link to={`/Admin/Sponsor/`}>New Sponsor</Link>}
        <form
          onSubmit={event => {
            event.preventDefault();
            sponsorManager.resourceFormManager.saveResource();
          }}>
          <h2>Sponsors</h2>
          <TextInput
            label={'Name'}
            name={'name'}
            value={sponsorManager.resourceFormManager.formState.editView.name}
            onChange={sponsorManager.resourceFormManager.updateResourceProperty}
          />
          <MarkdownInput
            label={'Blurb'}
            name={'blurb'}
            value={sponsorManager.resourceFormManager.formState.editView.blurb}
            onChange={sponsorManager.resourceFormManager.updateResourceProperty}
            // extraAction={{ label: 'Populate From Sponsor Record', action: console.log }}
          />
          <TextInput
            label={'Website URL (Banner Add)'}
            name={'url'}
            value={sponsorManager.resourceFormManager.formState.editView.url}
            onChange={sponsorManager.resourceFormManager.updateResourceProperty}
          />
          <TextAreaInput
            rows={5}
            label={'Banner Add Blurb'}
            name={'shortBlurb'}
            value={sponsorManager.resourceFormManager.formState.editView.shortBlurb}
            onChange={sponsorManager.resourceFormManager.updateResourceProperty}
          />
          <TextAreaInput
            rows={5}
            label={'Contact Info'}
            name={'contactInfo'}
            value={sponsorManager.resourceFormManager.formState.editView.contactInfo}
            onChange={sponsorManager.resourceFormManager.updateResourceProperty}
          />
          <FormButtonGroup
            onClickCancelButton={console.log}
            onClickDeleteButton={toggleDeleteConfirmationModal}
            onClickSaveButton={sponsorManager.resourceFormManager.saveResource}
            disabled={sponsorManager.resourceFormManager.formState.state === 'saving'}
          />
        </form>
        <div style={{ color: 'red' }}>{sponsorManager.resourceFormManager.formMessage}</div>
        <div style={{ color: 'red' }}>{sponsorManager.resourceFormManager.formState.mode}</div>
        <Modali.Modal {...deleteConfirmationModal}>Delete {sponsorManager.resourceFormManager.formState.editView.name}?</Modali.Modal>
      </div>
    </>
  );
};
