import React, { useState } from 'react';
import styles from './Form.module.scss';
import { Select } from 'antd';

interface SelectInputProps<T> {
  label?: string;
  value?: number;
  name: keyof T;
  //<T, K extends keyof T>(obj: T, key: K, value: T[K])
  fetchData: (filter: string) => Promise<{ name: number; value: string }[]>;
  onChange: <K extends keyof T>(changeEvent: { name: K; value?: number }) => void;
}

export const SelectInput = <T extends {}>(props: SelectInputProps<T>) => {
  const [options, setOptions] = useState<{ name: number; value: string }[]>([]);
  const handleChange = (event: number) => {
    console.log('handle Change', event);
    props.onChange({ name: props.name, value: event });
  };

  const handleFetch = async (value: string) => {
    console.log('handle Change', value);
    const result = await props.fetchData(value);
    setOptions(result);
  };

  return (
    <div>
      {props.label && <label>{props.label}</label>}
      <Select<number>
        showSearch={true}
        mode="default"
        labelInValue={false}
        allowClear={true}
        value={props.value}
        //  notFoundContent={fetching ? <Spin size="small" /> : null}
        filterOption={false}
        onSearch={handleFetch}
        onChange={handleChange}
        style={{ width: '100%' }}>
        {options.map(d => (
          <Select.Option key={d.name}>{d.value}</Select.Option>
        ))}
      </Select>
    </div>
  );
};
