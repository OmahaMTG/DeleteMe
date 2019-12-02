import React from 'react';
import { TextInput } from '../../../1_Components/Form';
import { MarkdownInput } from '../../../1_Components/Form/MarkdownInput';

import { Collapse } from 'antd';
import { IMeetingPresentationPresenter } from '../../../3_Contracts/IMeetingPresentationPresenter';

export interface PresentationPresentersProps {
  values: IMeetingPresentationPresenter[];
  // changeHandlers: {};
}

export const PresentationPresenters = (props: PresentationPresentersProps) => {
  return (
    <Collapse accordion style={{ marginTop: 20 }}>
      {props.values.map(presenter => (
        <Collapse.Panel header="Presenter - Bob" key="1">
          <TextInput label={'Title'} name={'title'} value={''} onChange={console.log} />
          <MarkdownInput
            label={'Host Details'}
            name={'blurb'}
            value={presenter.meetingPresentationPresenterBody}
            onChange={console.log}
            extraAction={{ label: 'Populate From Host Record', action: console.log }}
          />
        </Collapse.Panel>
      ))}
    </Collapse>
  );
};
