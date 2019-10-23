import React from 'react';
import styles from './Form.module.scss';
import { DatePicker, Select } from 'antd';
import moment from 'moment';

interface MultiSelectProps {
  label: string;
  value: string;
  name: string;
  onChange: (event: { currentTarget: { value: string; name: string; type: 'date'; checked: boolean } }) => void;
}

export const MultiSelect = (props: MultiSelectProps) => {
  const onOk = (selectedTime: moment.Moment) => {
    props.onChange({ currentTarget: { value: selectedTime.format('YYYY-MM-DD h:mm:ss a'), name: props.name, type: 'date', checked: false } });
  };

  return (
    <div className={styles.fieldSet}>
      <label>{props.label}</label>
      <Select
        mode="default"
        labelInValue
        value={'d'}
        placeholder="Select users"
        filterOption={false}
        onSearch={() => {}}
        onChange={() => {}}
        style={{ width: '100%' }}></Select>
    </div>
  );
};
