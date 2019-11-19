import React from 'react';
import { MarkdownInput } from '../../../1_Components/Form/MarkdownInput';

import { Row, Col, Collapse } from 'antd';
import { DeleteButton } from '../../../1_Components/Form/Button';
import { IMeetingSponsor } from '../../../3_Contracts/IMeetingSponsor';
import { SelectInput } from '../../../1_Components/Form/SelectInput';
import { useLookupManager } from '../../../4_Managers/useLookupManager';
import { ISponsor } from '../../../3_Contracts/ISponsor';

export interface MeetingSponsorsProps {
  sponsors: IMeetingSponsor[];
  addBlankSponsor: () => void;
  removeSponsor: (index: number) => void;
  updateProperty: <K extends keyof IMeetingSponsor>(index: number, changeEvent: { name: K; value: IMeetingSponsor[K] }) => void;
}

//<T, V extends keyof T>(obj: T, key: V, value: T[V])

export const MeetingSponsors = (props: MeetingSponsorsProps) => {
  const [fetchSponsorLookup] = useLookupManager('/sponsor', (sponsor: ISponsor) => ({ name: sponsor.id, value: sponsor.name }));

  return (
    <>
      <Row gutter={16} style={{ marginTop: 20 }}>
        <Col span={6}>
          <DeleteButton size="default" onClick={props.addBlankSponsor}>
            Add Sponsor
          </DeleteButton>
        </Col>
      </Row>
      {props.sponsors.length > 0 && (
        <Collapse accordion style={{ marginTop: 20 }}>
          {props.sponsors.map((sponsor, index) => (
            <Collapse.Panel header="Sponsor - Bob" key={index}>
              <Row gutter={16}>
                <Col span={6}>
                  <DeleteButton size="default" onClick={() => props.removeSponsor(index)}>
                    Delete Sponsor Bob
                  </DeleteButton>
                </Col>
              </Row>
              <SelectInput
                label={'Host'}
                name={'title'}
                onChange={event => props.updateProperty(index, { name: 'id', value: event.value })}
                fetchData={fetchSponsorLookup}
              />
              <MarkdownInput
                label={'Host Details'}
                name={'blurb'}
                value={sponsor.blurb}
                onChange={event => props.updateProperty(index, { name: 'blurb', value: event.value })}
                extraAction={{ label: 'Populate From Host Record', action: console.log }}
              />
            </Collapse.Panel>
          ))}
        </Collapse>
      )}
    </>
  );
};
