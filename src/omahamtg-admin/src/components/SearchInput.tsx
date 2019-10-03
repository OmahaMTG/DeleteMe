import React from 'react';
import styles from './SearchInput.module.scss';

interface SearchInputProps {
  placeholder: string;
  value: string;

  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export const SearchInput = (props: SearchInputProps) => {
  return (
    <div className={styles.search}>
      <input type="text" placeholder={props.placeholder} value={props.value} onChange={props.onChange} />
    </div>
  );
};
