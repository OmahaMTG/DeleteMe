import React from 'react';
import styles from './Form.module.scss';
import { DatePicker } from 'antd';
import moment from 'moment';

interface DateTimeProps {
  label: string;
  value: string;
  name: string;
  onChange: (event: { currentTarget: { value: string; name: string; type: 'date'; checked: boolean } }) => void;
}

export const DateTime = (props: DateTimeProps) => {
  const onOk = (selectedTime: moment.Moment) => {
    props.onChange({ currentTarget: { value: selectedTime.format('YYYY-MM-DD h:mm:ss a'), name: props.name, type: 'date', checked: false } });
  };

  return (
    <div className={styles.fieldSet}>
      <label>{props.label}</label>
      <DatePicker showTime placeholder="Event Start Time" onOk={onOk} value={moment(props.value)} />
    </div>
  );
};
