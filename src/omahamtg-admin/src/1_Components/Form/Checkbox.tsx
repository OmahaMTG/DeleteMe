import React from 'react';
import styles from './Form.module.scss';
import { Checkbox as ACheckbox } from 'antd';
import { CheckboxChangeEvent } from 'antd/lib/checkbox';

interface CheckboxProps<T> {
  label: string;
  value: boolean;
  name: keyof T;
  onChange: <K extends keyof T>(changeEvent: { name: K; value: boolean }) => void;
}

export const Checkbox = <T extends {}>(props: CheckboxProps<T>) => {
  const handleChange = (e: CheckboxChangeEvent) => {
    props.onChange({ name: props.name, value: e.target.checked });
  };

  return (
    <div className={styles.fieldSet}>
      {props.label && <label>{props.label}</label>}
      <ACheckbox onChange={handleChange} checked={props.value}>
        {props.name}
      </ACheckbox>
    </div>
  );
};
