import React from 'react';
import { FixedSizeList as List } from 'react-window';

import styles from '../ContentManager.module.scss';
import AutoSizer from 'react-virtualized-auto-sizer';
import InfiniteLoader from 'react-window-infinite-loader';
import { Link } from 'react-router-dom';

import { ButtonFieldSet } from '../../../components/Form/ButtonFieldSet ';
import { SearchInput } from '../../../components/SearchInput';
import { buildApiService } from '../../../services/ApiService';
import { useEntityCollection } from '../useEntityCollection';
import Modali, { useModali } from 'modali';
import { Host } from '../../../models/host';
import { MarkdownInput } from '../../../components/Form/MarkdownInput';
import { Label } from 'office-ui-fabric-react/lib/Label';
import { TagPicker } from 'office-ui-fabric-react/lib/Pickers';
import { Stack } from 'office-ui-fabric-react';
import { Collapse, Icon } from 'antd';
import { Row as ARow, Col } from 'antd';
import { TextInput } from '../../../components/Form/TextInput';
import { Button } from 'antd';
import { DatePicker } from 'antd';
import { Select, Spin } from 'antd';
import { DateTime } from '../../../components/Form/DateTime';
import { MultiSelect } from '../../../components/Form/MultiSelect';

const { Panel } = Collapse;
const defaultHost: Omit<Host, 'id'> = {
  name: '',
  blurb: '',
  contactInfo: '',
  address: ''
};

const hostService = buildApiService<Host>('/host');

const GroupMeeting = () => {
  const entityCollection = useEntityCollection(hostService, defaultHost, '/Admin/host');
  const [deleteConfirmationModal, toggleDeleteConfirmationModal] = useModali({
    animated: true,
    title: 'Are you sure?',
    message: 'Deleting this user will be permanent.',
    buttons: [
      <Modali.Button label="Cancel" isStyleCancel onClick={() => toggleDeleteConfirmationModal()} />,
      <Modali.Button
        label="Delete"
        isStyleDestructive
        onClick={() => {
          entityCollection.deleteEntity();
          toggleDeleteConfirmationModal();
        }}
      />
    ]
  });

  const Row = ({ index, style }: { index: number; style: any }) => {
    return (
      <div style={style}>
        {entityCollection.listState.resultSet.records[index] && (
          <Link
            to={`/Admin/host/${entityCollection.listState.resultSet.records[index].id}/${entityCollection.listState.resultSet.records[
              index
            ].name.replace(/[^a-zA-Z0-9-_]/g, '_')}`}>
            {entityCollection.listState.resultSet.records[index] &&
              entityCollection.listState.resultSet.records[index].name + ' - ' + entityCollection.listState.resultSet.records[index].id}
          </Link>
        )}
        {!entityCollection.listState.resultSet.records[index] && <div>Loading... </div>}
      </div>
    );
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement> | { currentTarget: { value: string; name: string; type: 'date'; checked: boolean } }
  ) => {
    const target = e.currentTarget;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;
    entityCollection.updateEntityContent(name, value);
  };

  return (
    <>
      <div className={styles.listContainer}>
        <div className={styles.search}>
          <SearchInput
            placeholder="Filter..."
            onChange={e => entityCollection.updateSearchFilter(e.currentTarget.value)}
            value={entityCollection.listState.filter}
          />
          <div>
            {' '}
            <Button onClick={() => entityCollection.applySearchFilter()} value="Search" />
            <Button onClick={() => entityCollection.clearSearchFilter()} value="Clear Search" />
          </div>
        </div>
        <div className={styles.list}>
          {entityCollection.listState.state === 'initializing' && <div>Loading...</div>}
          {entityCollection.listState.state === 'error' && <div>Error...</div>}
          {entityCollection.listState.state === 'ready' && (
            <AutoSizer>
              {({ height, width }) => (
                <InfiniteLoader
                  isItemLoaded={entityCollection.isEntityLoaded}
                  itemCount={entityCollection.listState.resultSet.totalRecords}
                  loadMoreItems={entityCollection.loadMoreEntities}>
                  {({ onItemsRendered, ref }) => (
                    <List
                      height={height}
                      itemSize={35}
                      width={width}
                      itemCount={entityCollection.listState.resultSet.totalRecords}
                      onItemsRendered={onItemsRendered}
                      ref={ref}>
                      {Row}
                    </List>
                  )}
                </InfiniteLoader>
              )}
            </AutoSizer>
          )}
        </div>
      </div>
      <div className={styles.formContainer}>
        <h2>Event</h2>
        {entityCollection.formState.mode === 'edit' && <Link to={`/Admin/host/`}>New Host</Link>}
        <form
          onSubmit={event => {
            event.preventDefault();
            entityCollection.saveEntity();
          }}>
          <TextInput label={'Title'} name={'name'} value={entityCollection.formState.editView.name} onChange={handleInputChange} />

          <Collapse accordion style={{ marginTop: 20 }}>
            <Panel header="Basics" key="1">
              <ARow gutter={16}>
                <Col span={12}>
                  <DateTime label="Event Start Time" name={'name'} value={entityCollection.formState.editView.name} onChange={() => {}} />
                </Col>
                <Col span={12}>
                  <DateTime label="Event End Time" name={'name'} value={entityCollection.formState.editView.name} onChange={() => {}} />
                </Col>
              </ARow>

              <ARow gutter={16}>
                <Col span={12}>
                  <DateTime label="Publish Start Time" name={'name'} value={entityCollection.formState.editView.name} onChange={() => {}} />
                </Col>
                <Col span={12}>
                  <TextInput label="Vimeo ID" name={'name'} value={entityCollection.formState.editView.name} onChange={handleInputChange} />
                </Col>
              </ARow>
              <MultiSelect label="Template" name={'name'} value={entityCollection.formState.editView.name} onChange={handleInputChange} />
            </Panel>
            <Panel header="Host" key="2">
              <MultiSelect label="Host" name={'name'} value={entityCollection.formState.editView.name} onChange={handleInputChange} />
              <MarkdownInput
                label={'Host Body'}
                name={'blurb'}
                value={entityCollection.formState.editView.blurb}
                onChange={console.log}
                extraAction={{ label: 'Populate Host Body', action: () => {} }}
              />
            </Panel>
            <Panel header="Sponsors" key="3">
              <ARow gutter={16}>
                <Col span="12">
                  <Button type="danger" size="small" onClick={() => {}}>
                    Delete Sponsor
                  </Button>
                </Col>
              </ARow>
              <MultiSelect label="Sponsor" name={'name'} value={entityCollection.formState.editView.name} onChange={handleInputChange} />
              <MarkdownInput
                label={'Sponsor Body'}
                name={'blurb'}
                value={entityCollection.formState.editView.blurb}
                onChange={console.log}
                extraAction={{ label: 'Populate Sponsor Body', action: () => {} }}
              />
            </Panel>

            <Panel header="Presentations" key="4">
              <ARow gutter={16}>
                <Col span="12">
                  <Button type="danger" size="small" onClick={() => {}}>
                    Delete Presentation
                  </Button>
                </Col>
              </ARow>
              <Collapse accordion style={{ marginTop: 20 }}>
                <Panel header="presenter" key="1">
                  <ARow gutter={16}>
                    <Col span="12">
                      <Button type="danger" size="small" onClick={() => {}}>
                        Delete Sponsor
                      </Button>
                    </Col>
                  </ARow>
                  <MultiSelect label="Presenter" name={'name'} value={entityCollection.formState.editView.name} onChange={handleInputChange} />
                  <MarkdownInput
                    label={'Presenter Body'}
                    name={'blurb'}
                    value={entityCollection.formState.editView.blurb}
                    onChange={console.log}
                    extraAction={{ label: 'Populate Presenter Body', action: () => {} }}
                  />
                </Panel>
              </Collapse>
              <MultiSelect label="Presentation" name={'name'} value={entityCollection.formState.editView.name} onChange={handleInputChange} />
              <MarkdownInput
                label={'Presentation Body'}
                name={'blurb'}
                value={entityCollection.formState.editView.blurb}
                onChange={console.log}
                extraAction={{ label: 'Populate Presentation Body', action: () => {} }}
              />
            </Panel>
          </Collapse>

          <ButtonFieldSet>
            <div className="button-left">
              {entityCollection.formState.mode === 'edit' && (
                <input
                  type="button"
                  value="Delete"
                  className="btn-delete"
                  onClick={() => toggleDeleteConfirmationModal()}
                  disabled={entityCollection.formState.state === 'saving'}
                />
              )}
            </div>
            <div className="button-right">
              <input type="submit" value="Cancel" className="btn-cancel" disabled={entityCollection.formState.state === 'saving'} />
              <input type="submit" value="Save" className="btn-save" disabled={entityCollection.formState.state === 'saving'} />
            </div>
          </ButtonFieldSet>
        </form>
        <div style={{ color: 'red' }}>{entityCollection.formMessage}</div>
        <Modali.Modal {...deleteConfirmationModal}>Delete {entityCollection.formState.editView.name}?</Modali.Modal>
      </div>
    </>
  );
};

export default GroupMeeting;
