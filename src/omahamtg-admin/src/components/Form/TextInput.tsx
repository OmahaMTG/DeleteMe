import React from 'react';
import styles from './Form.module.scss';

interface TextInputProps {
  label: string;
  value: string;
  name: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export const TextInput = (props: TextInputProps) => {
  return (
    <div className={styles.fieldSet}>
      <label>{props.label}</label>
      <input type="text" name={props.name} value={props.value} onChange={props.onChange} />
    </div>
  );
};
