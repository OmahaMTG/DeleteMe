import React from 'react';
import { Button } from 'antd';

interface OkButtonProps {
  onClick: () => void;
  size: 'small' | 'default';
  children: string;
  disabled?: boolean;
}

export const OkButton = (props: OkButtonProps) => {
  return (
    <Button size={props.size} type="primary" onClick={props.onClick} disabled={props.disabled}>
      {props.children}
    </Button>
  );
};

export const ActionButton = (props: OkButtonProps) => {
  return (
    <Button size={props.size} type="default" onClick={props.onClick} disabled={props.disabled}>
      {props.children}
    </Button>
  );
};

export const SaveButton = (props: OkButtonProps) => {
  return (
    <Button size={props.size} type="primary" onClick={props.onClick} disabled={props.disabled}>
      {props.children}
    </Button>
  );
};

export const CancelButton = (props: OkButtonProps) => {
  return (
    <Button size={props.size} type="default" onClick={props.onClick} disabled={props.disabled}>
      {props.children}
    </Button>
  );
};

export const DeleteButton = (props: OkButtonProps) => {
  return (
    <Button size={props.size} type="danger" onClick={props.onClick} disabled={props.disabled}>
      {props.children}
    </Button>
  );
};
