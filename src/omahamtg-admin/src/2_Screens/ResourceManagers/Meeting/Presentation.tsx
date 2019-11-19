import React from 'react';
import { Collapse } from 'antd';
import { IMeetingPresentation } from '../../../3_Contracts/IMeetingPresentation';

export interface MeetingPresentationsProps {
  values: IMeetingPresentation[];
  // changeHandlers: {};
}

export const MeetingPresentations = (props: MeetingPresentationsProps) => {
  return (
    <Collapse accordion style={{ marginTop: 20 }}>
      {/* <Collapse.Panel header="Presentation - Bob" key="1">
        <PresentationPresenters values={props.values} />
        <TextInput label={'Title'} name={'title'} value={props.values.title} onChange={console.log} />
        <MarkdownInput
          label={'Host Details'}
          name={'blurb'}
          value={props.values.hostBody}
          onChange={console.log}
          extraAction={{ label: 'Populate From Host Record', action: console.log }}
        />
      </Collapse.Panel>
      <Collapse.Panel header="Presentation - Bob" key="2">
        <TextInput label={'Title'} name={'title'} value={props.values.title} onChange={console.log} />
        <MarkdownInput
          label={'Host Details'}
          name={'blurb'}
          value={props.values.hostBody}
          onChange={console.log}
          extraAction={{ label: 'Populate From Host Record', action: console.log }}
        />
      </Collapse.Panel>
      <Collapse.Panel header="Presentation - Bob" key="3">
        <TextInput label={'Title'} name={'title'} value={props.values.title} onChange={console.log} />
        <MarkdownInput
          label={'Host Details'}
          name={'blurb'}
          value={props.values.hostBody}
          onChange={console.log}
          extraAction={{ label: 'Populate From Host Record', action: console.log }}
        />
      </Collapse.Panel> */}
    </Collapse>
  );
};
