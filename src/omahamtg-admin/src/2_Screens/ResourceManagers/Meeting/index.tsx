import React from 'react';
import { ContentList } from '../Components/ResourceList';
import Modali, { useModali } from 'modali';
import styles from '../ContentManagers.module.scss';
import { Link } from 'react-router-dom';
import { FormButtonGroup } from '../../../1_Components/Form/FormButtonGroup';
import { MeetingBasics } from './Basics';
import { MeetingSponsors } from './Sponsor';
import { MeetingPresentations } from './Presentation';
import { useMeetingManager } from '../../../4_Managers/ResourceManager/useMeetingManager';

export const Meetings = () => {
  const resourceManager = useMeetingManager();
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
          resourceManager.resourceFormManager.deleteResource();
          toggleDeleteConfirmationModal();
        }}
      />
    ]
  });
  return (
    <>
      <ContentList resourceManager={resourceManager} resourceListRenderer={resource => resource.title} resourceUrl="/Admin/Meeting" />
      <div className={styles.formContainer}>
        {resourceManager.resourceFormManager.formState.mode === 'edit' && <Link to={`/Admin/Event/`}>New Meeting</Link>}
        <form
          onSubmit={event => {
            event.preventDefault();
            resourceManager.resourceFormManager.saveResource();
          }}>
          <h2>Event</h2>
          <MeetingBasics
            meeting={resourceManager.resourceFormManager.formState.editView}
            updateResourceProperty={resourceManager.resourceFormManager.updateResourceProperty}
          />
          <MeetingSponsors
            removeSponsor={resourceManager.resourceFormManager.removeSponsor}
            addBlankSponsor={resourceManager.resourceFormManager.addBlankSponsor}
            sponsors={resourceManager.resourceFormManager.formState.editView.meetingSponsors}
            updateProperty={resourceManager.resourceFormManager.updateSponsorProperty}
          />
          <MeetingPresentations values={resourceManager.resourceFormManager.formState.editView.meetingPresentations} />
          <FormButtonGroup
            onClickCancelButton={console.log}
            onClickDeleteButton={toggleDeleteConfirmationModal}
            onClickSaveButton={resourceManager.resourceFormManager.saveResource}
            disabled={resourceManager.resourceFormManager.formState.state === 'saving'}
          />
        </form>
        <div style={{ color: 'red' }}>{resourceManager.resourceFormManager.formMessage}</div>
        <div style={{ color: 'red' }}>{resourceManager.resourceFormManager.formState.mode}</div>
        <Modali.Modal {...deleteConfirmationModal}>Delete {resourceManager.resourceFormManager.formState.editView.title}?</Modali.Modal>
      </div>
    </>
  );
};
