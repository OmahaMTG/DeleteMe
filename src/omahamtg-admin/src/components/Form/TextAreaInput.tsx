import React from 'react';
import styles from './Form.module.scss';

interface TextAreaInputProps {
  label: string;
  value: string;
  name: string;
  rows: number;
  onChange: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
}

export const TextAreaInput = (props: TextAreaInputProps) => {
  return (
    <div className={styles.fieldSet}>
      <label>{props.label}</label>
      <textarea rows={props.rows} name={props.name} value={props.value} onChange={props.onChange} />
    </div>
  );
};
