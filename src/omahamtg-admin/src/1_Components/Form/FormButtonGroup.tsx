import React from 'react';
import styles from './Form.module.scss';
import { CancelButton, DeleteButton, SaveButton } from './Button';

interface FormButtonGroupProps {
  onClickDeleteButton: () => void;
  onClickCancelButton: () => void;
  onClickSaveButton: () => void;
  disabled: boolean;
}

export const FormButtonGroup = (props: FormButtonGroupProps) => {
  return (
    <div className={styles.buttonFieldSet}>
      <div className={styles.left}>
        <DeleteButton size="default" onClick={props.onClickDeleteButton} disabled={props.disabled}>
          Delete
        </DeleteButton>
      </div>
      <div className={styles.right}>
        <CancelButton size="default" onClick={props.onClickCancelButton} disabled={props.disabled}>
          Cancel
        </CancelButton>
        <SaveButton size="default" onClick={props.onClickSaveButton} disabled={props.disabled}>
          Save
        </SaveButton>
      </div>
    </div>
  );
};
