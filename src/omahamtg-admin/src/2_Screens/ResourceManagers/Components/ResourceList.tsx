import React from 'react';
import styles from './ResourceList.module.scss';
import AutoSizer from 'react-virtualized-auto-sizer';
import InfiniteLoader from 'react-window-infinite-loader';
import { Link } from 'react-router-dom';
import { FixedSizeList as List } from 'react-window';
import { resourceBase } from '../../../3_Contracts';
import { IResourceManager } from '../../../4_Managers/ResourceManager/contracts/contracts';
import { TextInput } from '../../../1_Components/Form';
import { OkButton } from '../../../1_Components/Form/Button';

export const ContentList = <T extends resourceBase>(props: {
  resourceManager: IResourceManager<T>;
  resourceListRenderer: (resource: T) => string;
  resourceUrl: string;
}) => {
  const Row = ({ index, style }: { index: number; style: any }) => {
    const record = props.resourceManager.resourceCollectionManager.collectionState.resultSet.records[index];
    return (
      <div style={style}>
        {record && (
          <Link to={`${props.resourceUrl}/${record.id}/${props.resourceListRenderer(record).replace(/[^a-zA-Z0-9-_]/g, '_')}`}>
            {record && props.resourceListRenderer(record) + ' - ' + record.id}
          </Link>
        )}
        {!record && <div>Loading... </div>}
      </div>
    );
  };

  return (
    <div className={styles.listContainer}>
      <div className={styles.search}>
        <TextInput
          placeholder="Filter..."
          onChange={e => props.resourceManager.resourceCollectionManager.updateSearchFilter(e.value)}
          value={props.resourceManager.resourceCollectionManager.collectionState.filter}
          name="Search"
        />
        <div className={styles.searchButtons}>
          <OkButton onClick={props.resourceManager.resourceCollectionManager.clearSearchFilter} size="default">
            Clear
          </OkButton>
          <OkButton onClick={props.resourceManager.resourceCollectionManager.applySearchFilter} size="default">
            Search
          </OkButton>
        </div>
      </div>
      <div className={styles.list}>
        {props.resourceManager.resourceCollectionManager.collectionState.state === 'ready' && (
          <AutoSizer>
            {({ height, width }) => (
              <InfiniteLoader
                isItemLoaded={props.resourceManager.resourceCollectionManager.isResourceLoaded}
                itemCount={props.resourceManager.resourceCollectionManager.collectionState.resultSet.totalRecords}
                loadMoreItems={props.resourceManager.resourceCollectionManager.loadMoreResources}>
                {({ onItemsRendered, ref }) => (
                  <List
                    height={height}
                    itemSize={35}
                    width={width}
                    itemCount={props.resourceManager.resourceCollectionManager.collectionState.resultSet.totalRecords}
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
  );
};
