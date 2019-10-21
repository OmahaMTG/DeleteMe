import React from 'react';
import { FixedSizeList as List } from 'react-window';

import styles from './ContentManager.module.scss';
import AutoSizer from 'react-virtualized-auto-sizer';
import InfiniteLoader from 'react-window-infinite-loader';
import { Link } from 'react-router-dom';

import { ButtonFieldSet } from '../../components/Form/ButtonFieldSet ';
import { SearchInput } from '../../components/SearchInput';
import { buildApiService } from '../../services/ApiService';
import { useEntityCollection } from './useEntityCollection';
import Modali, { useModali } from 'modali';
import { Host } from '../../models/host';
import { MarkdownInput } from '../../components/Form/MarkdownInput';
import { Label } from 'office-ui-fabric-react/lib/Label';
import { TagPicker, IBasePicker, ITag } from 'office-ui-fabric-react/lib/Pickers';
import { TextField } from 'office-ui-fabric-react/lib/TextField';
import { DefaultButton, PrimaryButton, Stack, IStackTokens } from 'office-ui-fabric-react';
import { Collapse } from 'antd';
import { Input } from 'antd';
import { TextInput } from '../../components/Form/TextInput';
import { Button } from 'antd';
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

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const target = e.target;
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
              <TextField label="Event Start Time" value={'hi'} onChange={console.log} />
              <TextField label="Event End Time" value={'hi'} onChange={console.log} />
              <TextField label="Publish Start Time" value={'hi'} onChange={console.log} />
              <TextField label="Vimeo ID" value={'hi'} onChange={console.log} />
              <TextField label="Template" value={'hi'} onChange={console.log} />
            </Panel>
            <Panel header="Host" key="2">
              <Stack horizontal disableShrink verticalAlign="center" maxWidth="600px" horizontalAlign="space-between">
                <Label>Host</Label>
                <Button type="default" size="small">
                  Populate Host Body
                </Button>
              </Stack>
              <TagPicker
                onResolveSuggestions={() => []}
                pickerSuggestionsProps={{
                  suggestionsHeaderText: 'Matching Hosts',
                  noResultsFoundText: 'No Hosts'
                }}
                itemLimit={2}
                inputProps={{
                  onBlur: (ev: React.FocusEvent<HTMLInputElement>) => console.log('onBlur called'),
                  onFocus: (ev: React.FocusEvent<HTMLInputElement>) => console.log('onFocus called'),
                  'aria-label': 'Tag Picker'
                }}
              />
              <MarkdownInput label={'Host Body'} name={'blurb'} value={entityCollection.formState.editView.blurb} onChange={console.log} />
            </Panel>
            <Panel header="Sponsors" key="3">
              <Stack horizontal disableShrink verticalAlign="center" maxWidth="600px" horizontalAlign="space-between">
                <Label>Sponsor</Label>
                <PrimaryButton style={{ height: 20 }} text="Populate Host Body" />
              </Stack>
              <TextField label="Sponsor" value={'hi'} onChange={console.log} styles={{ fieldGroup: { width: 600 } }} />
              <MarkdownInput label={'Sponsor Body'} name={'blurb'} value={entityCollection.formState.editView.blurb} onChange={console.log} />
            </Panel>
            <Panel header="Presentations" key="4">
              <TextField label="Presenter" value={'hi'} onChange={console.log} styles={{ fieldGroup: { width: 600 } }} />
              <MarkdownInput label={'Presenter Body'} name={'blurb'} value={entityCollection.formState.editView.blurb} onChange={console.log} />
              <MarkdownInput label={'Presentation'} name={'blurb'} value={entityCollection.formState.editView.blurb} onChange={console.log} />
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
