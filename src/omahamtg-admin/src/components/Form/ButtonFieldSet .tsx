import React from 'react';
import styles from './Form.module.scss';

interface ButtonFieldSetProps {
  children: JSX.Element[];
}

export const ButtonFieldSet = (props: ButtonFieldSetProps) => {
  return <div className={styles.buttonFieldSet}>{props.children}</div>;
};
