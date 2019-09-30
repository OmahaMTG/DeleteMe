import React from 'react';
import styles from './Form.module.scss';

interface ButtonProps {
  onClick: (event: React.MouseEvent<HTMLInputElement>) => void;
  value: string;
}

export const Button = (props: ButtonProps) => {
  return <input className={styles.button} type="button" value={props.value} onClick={props.onClick} />;
};
