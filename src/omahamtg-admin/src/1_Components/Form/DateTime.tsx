import React from 'react';
import styles from './Form.module.scss';
import { DatePicker } from 'antd';
import moment from 'moment';

interface DateTimeProps<T> {
  label: string;
  value?: string;
  name: keyof T;
  onChange: <K extends keyof T>(changeEvent: { name: K; value?: string }) => void;
}

export const DateTime = <T extends {}>(props: DateTimeProps<T>) => {
  const onOk = (selectedTime: moment.Moment) => {
    props.onChange({ name: props.name, value: selectedTime.toISOString() });
  };

  const onChange = (selectedTime: moment.Moment | null, dateString: string) => {
    props.onChange({ name: props.name, value: selectedTime ? selectedTime.toISOString() : undefined });
  };

  return (
    <div className={styles.fieldSet}>
      {props.label && <label>{props.label}</label>}
      <DatePicker
        showTime
        placeholder="Event Start Time"
        onOk={onOk}
        value={moment(props.value)}
        onChange={onChange}
        format={'MMM DD, YYYY hh:mm a'}
      />
    </div>
  );
};
