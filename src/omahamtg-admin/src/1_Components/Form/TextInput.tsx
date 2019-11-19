import React from 'react';
import styles from './Form.module.scss';
import { Input } from 'antd';

interface TextInputProps<T> {
  label?: string;
  value: string;
  name: keyof T;
  placeholder?: string;
  onChange: <K extends keyof T>(changeEvent: { name: K; value: string }) => void;
}

export const TextInput = <T extends {}>(props: TextInputProps<T>) => {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    props.onChange({ name: props.name, value: event.currentTarget.value });
  };
  return (
    <div className={styles.fieldSet}>
      {props.label && <label>{props.label}</label>}
      <Input placeholder={props.placeholder} value={props.value} onChange={handleChange} />
    </div>
  );
};
