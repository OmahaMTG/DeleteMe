import React from 'react';
import { TextInput } from '../../../1_Components/Form';
import { MarkdownInput } from '../../../1_Components/Form/MarkdownInput';

import { Row, Col, Collapse } from 'antd';
import { DateTime } from '../../../1_Components/Form/DateTime';
import { Checkbox } from '../../../1_Components/Form/Checkbox';
import { IMeeting } from '../../../3_Contracts/IMeeting';
import { SelectInput } from '../../../1_Components/Form/SelectInput';
import { ITemplate } from '../../../3_Contracts/ITemplate';
import { useLookupManager } from '../../../4_Managers/useLookupManager';

export interface MeetingBasicsProps {
  meeting: Omit<IMeeting, 'id'>;
  updateResourceProperty: <K extends keyof IMeeting>(changeEvent: { name: K; value?: IMeeting[K] }) => void;

  // changeHandlers: {};
}

export const MeetingBasics = (props: MeetingBasicsProps) => {
  const [fetchTemplates] = useLookupManager('/template', (template: ITemplate) => ({ name: template.id, value: template.name }));

  return (
    <Collapse accordion style={{ marginTop: 20 }}>
      <Collapse.Panel header="Basics" key="1">
        <TextInput label={'Title'} name={'title'} value={props.meeting.title} onChange={props.updateResourceProperty} />
        <SelectInput
          label={'Template'}
          value={props.meeting.templateId}
          name={'templateId'}
          onChange={props.updateResourceProperty}
          fetchData={fetchTemplates}
        />
        <Row gutter={16}>
          <Col span={12}>
            <DateTime label="Event Start Time" name={'startTime'} value={props.meeting.startTime} onChange={props.updateResourceProperty} />
          </Col>
          <Col span={12}>
            <DateTime label="Event End Time" name={'endTime'} value={props.meeting.endTime} onChange={props.updateResourceProperty} />
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={12}>
            <DateTime label="Publish Time" name={'publishStartTime'} value={props.meeting.publishStartTime} onChange={props.updateResourceProperty} />
          </Col>
          <Col span={12}>
            <Checkbox label="Draft" name={'isDraft'} value={props.meeting.isDraft} onChange={props.updateResourceProperty} />
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={12}>
            {/* <TextInput label={'Tags'} name={'templateId'} value={props.meeting.tags} onChange={props.updateResourceProperty} /> */}
          </Col>
          <Col span={12}>
            <TextInput label={'Vimeo Id'} name={'vimeoId'} value={props.meeting.vimeoId} onChange={props.updateResourceProperty} />
          </Col>
        </Row>
        {/* <TextInput label={'Host'} name={'templateId'} value={props.meeting.hostId} onChange={props.updateResourceProperty} /> */}
        {/* <MarkdownInput
          label={'Host Details'}
          name={'blurb'}
          value={props.meeting.hostBody}
          onChange={console.log}
          extraAction={{ label: 'Populate From Host Record', action: console.log }}
        /> */}
      </Collapse.Panel>
    </Collapse>
  );
};
