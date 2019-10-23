import React, { useState } from 'react';
import styles from './Form.module.scss';
import ReactMde from 'react-mde';
import * as Showdown from 'showdown';
import 'react-mde/lib/styles/css/react-mde-all.css';
import { Label } from 'office-ui-fabric-react/lib/Label';
import { Button } from 'antd';
import { Stack } from 'office-ui-fabric-react';
interface MarkdownInputProps {
  label: string;
  value: string;
  name: string;
  onChange: (value: string) => void;
  extraAction?: { label: string; action: () => void };
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
      <Stack horizontal disableShrink verticalAlign="center" horizontalAlign="space-between">
        <Label>{props.label}</Label>
        {props.extraAction && (
          <Button type="default" size="small" onClick={props.extraAction.action}>
            {props.extraAction.label}
          </Button>
        )}
      </Stack>
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
