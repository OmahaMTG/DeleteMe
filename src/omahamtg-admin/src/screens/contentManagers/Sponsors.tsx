import React from 'react';
import { FixedSizeList as List } from 'react-window';

import styles from './ContentManager.module.scss';
import { useSponsors } from './useSponsors';
import AutoSizer from 'react-virtualized-auto-sizer';
import InfiniteLoader from 'react-window-infinite-loader';

const Sponsors = () => {
  const { sponsors, isSponsorLoaded, loadMoreSponsors } = useSponsors();

  const Row = ({ index, style }: { index: number; style: any }) => <div style={style}>{sponsors.records[index] && sponsors.records[index].name}</div>;

  return (
    <>
      <div className={styles.listContainer}>
        {/* <ul>
          {sponsors.map(s => (
            <li key={s.name}> {s.name}</li>
          ))}
        </ul> */}
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
      <div className={styles.formContainer}>form</div>
    </>
  );
};

export default Sponsors;
