import React from 'react';
import { FixedSizeList as List } from 'react-window';

import styles from './ContentManager.module.scss';
import AutoSizer from 'react-virtualized-auto-sizer';
import InfiniteLoader from 'react-window-infinite-loader';
import { Link } from 'react-router-dom';
import { TextInput } from '../../components/Form/TextInput';
import { MarkdownInput } from '../../components/Form/MarkdownInput';
import { TextAreaInput } from '../../components/Form/TextAreaInput';
import { ButtonFieldSet } from '../../components/Form/ButtonFieldSet ';
import { SearchInput } from '../../components/SearchInput';
import { Button } from '../../components/Form/Button';
import { buildApiService } from '../../services/ApiService';
import { entityBase } from './ContentManagerModels';
import { useEntityCollection } from './useEntityCollection';

export interface Sponsor extends entityBase {
  id: number;
  name: string;
  blurb: string;
  contactInfo: string;
  shortBlurb: string;
  url: string;
}

const defaultSponsor = {
  name: '',
  blurb: '',
  contactInfo: '',
  shortBlurb: '',
  url: ''
};

const sponsorService = buildApiService<Sponsor>('/sponsor');

const Sponsors = () => {
  const entityCollection = useEntityCollection(sponsorService, defaultSponsor);

  const Row = ({ index, style }: { index: number; style: any }) => {
    return (
      <div style={style}>
        {entityCollection.listState.resultSet.records[index] && (
          <Link
            to={`/Sponsor/${entityCollection.listState.resultSet.records[index].id}/${entityCollection.listState.resultSet.records[
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
            <InfiniteLoader
              isItemLoaded={entityCollection.isEntityLoaded}
              itemCount={entityCollection.listState.resultSet.totalRecords}
              loadMoreItems={entityCollection.loadMoreEntities}>
              {({ onItemsRendered, ref }) => (
                <AutoSizer>
                  {({ height, width }) => (
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
                </AutoSizer>
              )}
            </InfiniteLoader>
          )}
        </div>
      </div>
      <div className={styles.formContainer}>
        {entityCollection.formState.mode === 'edit' && <Link to={`/Sponsor/`}>New Sponsor</Link>}
        <form
          onSubmit={event => {
            event.preventDefault();
            entityCollection.saveEntity();
          }}>
          <TextInput label={'Name'} name={'name'} value={entityCollection.formState.editView.name} onChange={handleInputChange} />
          <MarkdownInput
            label={'Blurb'}
            name={'blurb'}
            value={entityCollection.formState.editView.blurb}
            onChange={value => entityCollection.updateEntityContent('blurb', value)}
          />
          <TextInput label={'Website URL (Banner Add)'} name={'url'} value={entityCollection.formState.editView.url} onChange={handleInputChange} />
          <TextAreaInput
            rows={3}
            label={'Banner Add Blurb'}
            name={'shortBlurb'}
            value={entityCollection.formState.editView.shortBlurb}
            onChange={event => entityCollection.updateEntityContent('shortBlurb', event.target.value)}
          />
          <TextAreaInput
            rows={10}
            label={'Contact Info'}
            name={'contactInfo'}
            value={entityCollection.formState.editView.contactInfo}
            onChange={event => entityCollection.updateEntityContent('contactInfo', event.target.value)}
          />
          <ButtonFieldSet>
            <div className="button-left">
              {entityCollection.formState.mode === 'edit' && (
                <input type="button" value="Delete" className="btn-delete" onClick={() => entityCollection.deleteEntity()} />
              )}
            </div>
            <div className="button-right">
              <input type="submit" value="Cancel" className="btn-cancel" />
              <input type="submit" value="Save" className="btn-save" />
            </div>
          </ButtonFieldSet>
        </form>
        <div style={{ color: 'red' }}>{entityCollection.formState.editorMessage}</div>
      </div>
    </>
  );
};

export default Sponsors;
