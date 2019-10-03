import React from 'react';
import { FixedSizeList as List } from 'react-window';

import styles from './ContentManager.module.scss';
import { useSponsors } from './useSponsors';
import AutoSizer from 'react-virtualized-auto-sizer';
import InfiniteLoader from 'react-window-infinite-loader';
import { Link } from 'react-router-dom';
import { TextInput } from '../../components/Form/TextInput';
import { MarkdownInput } from '../../components/Form/MarkdownInput';
import { TextAreaInput } from '../../components/Form/TextAreaInput';
import { ButtonFieldSet } from '../../components/Form/ButtonFieldSet ';
import { SearchInput } from '../../components/SearchInput';
import { Button } from '../../components/Form/Button';

const Sponsors = () => {
  const {
    sponsorFormState,
    isSponsorLoaded,
    loadMoreSponsors,
    updateSponsorContent,
    saveSponsor,

    updateSearchFilter,
    deleteSponsor,
    sponsorListState,
    applySearchFilter,
    clearSearchFilter
  } = useSponsors();

  const Row = ({ index, style }: { index: number; style: any }) => {
    return (
      <div style={style}>
        {sponsorListState.resultSet.records[index] && (
          <Link
            to={`/Sponsor/${sponsorListState.resultSet.records[index].id}/${sponsorListState.resultSet.records[index].name.replace(
              /[^a-zA-Z0-9-_]/g,
              '_'
            )}`}>
            {sponsorListState.resultSet.records[index] &&
              sponsorListState.resultSet.records[index].name + ' - ' + sponsorListState.resultSet.records[index].id}
          </Link>
        )}
        {!sponsorListState.resultSet.records[index] && <div>Loading... </div>}
      </div>
    );
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const target = e.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;
    updateSponsorContent(name, value);
  };

  return (
    <>
      <div className={styles.listContainer}>
        <div className={styles.search}>
          <SearchInput placeholder="Filter..." onChange={e => updateSearchFilter(e.currentTarget.value)} value={sponsorListState.filter} />
          <div>
            {' '}
            <Button onClick={() => applySearchFilter()} value="Search" />
            <Button onClick={() => clearSearchFilter()} value="Clear Search" />
          </div>
        </div>
        <div className={styles.list}>
          {sponsorListState.state === 'initializing' && <div>Loading...</div>}
          {sponsorListState.state === 'error' && <div>Error...</div>}
          {sponsorListState.state === 'ready' && (
            <InfiniteLoader isItemLoaded={isSponsorLoaded} itemCount={sponsorListState.resultSet.totalRecords} loadMoreItems={loadMoreSponsors}>
              {({ onItemsRendered, ref }) => (
                <AutoSizer>
                  {({ height, width }) => (
                    <List
                      height={height}
                      itemSize={35}
                      width={width}
                      itemCount={sponsorListState.resultSet.totalRecords}
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
        <form
          onSubmit={event => {
            event.preventDefault();
            saveSponsor();
          }}>
          <TextInput label={'Name'} name={'name'} value={sponsorFormState.editView.name} onChange={handleInputChange} />
          <MarkdownInput
            label={'Blurb'}
            name={'blurb'}
            value={sponsorFormState.editView.blurb}
            onChange={value => updateSponsorContent('blurb', value)}
          />
          <TextInput label={'Website URL (Banner Add)'} name={'url'} value={sponsorFormState.editView.url} onChange={handleInputChange} />
          <TextAreaInput
            rows={3}
            label={'Banner Add Blurb'}
            name={'shortBlurb'}
            value={sponsorFormState.editView.shortBlurb}
            onChange={event => updateSponsorContent('shortBlurb', event.target.value)}
          />
          <TextAreaInput
            rows={10}
            label={'Contact Info'}
            name={'contactInfo'}
            value={sponsorFormState.editView.contactInfo}
            onChange={event => updateSponsorContent('contactInfo', event.target.value)}
          />
          <ButtonFieldSet>
            <div className="button-left">
              <input type="button" value="Delete" className="btn-delete" onClick={() => deleteSponsor()} />
            </div>
            <div className="button-right">
              <input type="submit" value="Cancel" className="btn-cancel" />
              <input type="submit" value="Save" className="btn-save" />
            </div>
          </ButtonFieldSet>
        </form>
      </div>
    </>
  );
};

export default Sponsors;
