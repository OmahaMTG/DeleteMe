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

const Sponsors = () => {
  const {
    sponsors,
    isSponsorLoaded,
    loadMoreSponsors,
    updateSponsorContent,
    saveSponsor,
    createNewSponsor,
    deleteSponsor,
    sponsorForm
  } = useSponsors();

  const Row = ({ index, style }: { index: number; style: any }) => {
    return (
      <div style={style}>
        {sponsors.records[index] && (
          <Link to={`/Sponsor/${sponsors.records[index].id}/${sponsors.records[index].name.replace(/[^a-zA-Z0-9-_]/g, '_')}`}>
            {sponsors.records[index] && sponsors.records[index].name + ' - ' + sponsors.records[index].id}
          </Link>
        )}
        {!sponsors.records[index] && <div>Loading... </div>}
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
        <InfiniteLoader isItemLoaded={isSponsorLoaded} itemCount={sponsors.totalRecords} loadMoreItems={loadMoreSponsors}>
          {({ onItemsRendered, ref }) => (
            <AutoSizer>
              {({ height, width }) => (
                <List height={height} itemSize={35} width={width} itemCount={sponsors.totalRecords} onItemsRendered={onItemsRendered} ref={ref}>
                  {Row}
                </List>
              )}
            </AutoSizer>
          )}
        </InfiniteLoader>
      </div>
      <div className={styles.formContainer}>
        <form
          onSubmit={event => {
            event.preventDefault();
            saveSponsor();
          }}>
          <TextInput label={'Name'} name={'name'} value={sponsorForm.editView.name} onChange={handleInputChange} />
          <MarkdownInput label={'Blurb'} name={'blurb'} value={sponsorForm.editView.blurb} onChange={value => updateSponsorContent('blurb', value)} />
          <TextInput label={'Website URL (Banner Add)'} name={'url'} value={sponsorForm.editView.url} onChange={handleInputChange} />
          <TextAreaInput
            rows={3}
            label={'Banner Add Blurb'}
            name={'shortBlurb'}
            value={sponsorForm.editView.shortBlurb}
            onChange={event => updateSponsorContent('shortBlurb', event.target.value)}
          />
          <TextAreaInput
            rows={10}
            label={'Contact Info'}
            name={'contactInfo'}
            value={sponsorForm.editView.contactInfo}
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
