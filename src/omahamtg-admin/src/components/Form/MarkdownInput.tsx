import React, { useState } from 'react';
import styles from './Form.module.scss';
import ReactMde from 'react-mde';
import * as Showdown from 'showdown';
import 'react-mde/lib/styles/css/react-mde-all.css';
import { Label } from 'office-ui-fabric-react/lib/Label';
interface MarkdownInputProps {
  label: string;
  value: string;
  name: string;
  onChange: (value: string) => void;
}

const converter = new Showdown.Converter({
  tables: true,
  simplifiedAutoLink: true,
  strikethrough: true,
  tasklists: true
});

export const MarkdownInput = (props: MarkdownInputProps) => {
  const [selectedTab, setSelectedTab] = useState<'write' | 'preview'>('write');

  return (
    <div className={styles.fieldSet}>
      <Label>{props.label}</Label>
      <ReactMde
        onChange={props.onChange}
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
