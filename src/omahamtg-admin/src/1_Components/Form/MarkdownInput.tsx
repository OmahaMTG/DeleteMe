import React, { useState } from 'react';
import styles from './Form.module.scss';
import ReactMde from 'react-mde';
import * as Showdown from 'showdown';
import 'react-mde/lib/styles/css/react-mde-all.css';
import { ActionButton } from './Button';

interface MarkdownInputProps<T> {
  label: string;
  value: string;
  name: keyof T;
  //<T, K extends keyof T>(obj: T, key: K, value: T[K])
  onChange: <K extends keyof T>(changeEvent: { name: K; value: string }) => void;
  extraAction?: { label: string; action: () => void };
}

const converter = new Showdown.Converter({
  tables: true,
  simplifiedAutoLink: true,
  strikethrough: true,
  tasklists: true
});

export const MarkdownInput = <T extends {}>(props: MarkdownInputProps<T>) => {
  const [selectedTab, setSelectedTab] = useState<'write' | 'preview'>('write');

  return (
    <div className={styles.fieldSet}>
      <div className={styles.flexRow}>
        {props.label && <label>{props.label}</label>}

        {props.extraAction && (
          <ActionButton size="small" onClick={props.extraAction.action}>
            {props.extraAction.label}
          </ActionButton>
        )}
      </div>

      <ReactMde
        onChange={e => props.onChange({ name: props.name, value: e })}
        value={props.value}
        onTabChange={tab => {
          setSelectedTab(tab);
        }}
        selectedTab={selectedTab}
        generateMarkdownPreview={markdown => Promise.resolve(converter.makeHtml(markdown))}
      />
    </div>
  );
};
