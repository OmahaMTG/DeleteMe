import React from 'react';
import styles from './Form.module.scss';
import { Input } from 'antd';

const { TextArea } = Input;

interface TextAreaInputProps<T> {
  label: string;
  value: string;
  name: keyof T;
  rows: number;
  onChange: <K extends keyof T>(changeEvent: { name: K; value: string }) => void;
}

export const TextAreaInput = <T extends {}>(props: TextAreaInputProps<T>) => {
  return (
    <div className={styles.fieldSet}>
      <label>{props.label}</label>
      <TextArea rows={props.rows} value={props.value} onChange={e => props.onChange({ name: props.name, value: e.currentTarget.value })} />
    </div>
  );
};
