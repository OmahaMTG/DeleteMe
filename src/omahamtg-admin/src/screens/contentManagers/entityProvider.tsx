import React, { createContext } from 'react';
import { IApiService } from '../../services/serviceContracts';
import { useEntityCollection } from './useEntityCollection';
import { useEntityEditor } from './useEntityEditor';
import { entityBase, entityProvider, idlessEntity } from './ContentManagerModels';

export const createUseContext = <T extends entityBase>() => {
  // const buildDefault = (): entityProvider<T> => {
  //   return {
  //     entityCollection: {
  //       isEntityLoaded: (index: number) => false,
  //       loadMoreEntities: (startIndex: number, stopIndex: number) => Promise.resolve(),
  //       updateSearchFilter: (value: string) => {
  //         return;
  //       },
  //       applySearchFilter: () => {
  //         return;
  //       },
  //       clearSearchFilter: () => {
  //         return;
  //       },
  //       listState: {
  //         resultSet: {
  //           skipped: 1,
  //           taken: 1,
  //           totalRecords: 1,
  //           records: []
  //         },
  //         state: 'initializing',
  //         filter: '',
  //         appliedFilter: ''
  //       }
  //     },

  //     entityEditor: {
  //       updateEntityContent: (key: string, value: string | boolean) => {
  //         return;
  //       },
  //       saveEntity: () => Promise.resolve(),
  //       deleteEntity: () => Promise.resolve(),
  //       formState: {
  //         editId: 1,
  //         mode: 'edit',
  //         editView: defaultEntity,
  //         editorMessage: ''
  //       }
  //     }
  //   };
  // };

  const EntityContext = createContext<entityProvider<T>>(({} as unknown) as entityProvider<T>);

  const EntityListProvider = <T extends entityBase>(props: {
    apiService: IApiService<T>;
    defaultEntity: idlessEntity;
    children: JSX.Element[] | JSX.Element;
  }) => {
    const entityCollection = useEntityCollection(props.apiService, props.defaultEntity);
    const entityEditor = useEntityEditor(props.apiService, props.defaultEntity);

    return <EntityContext.Provider value={{ entityEditor, entityCollection }}>{props.children}</EntityContext.Provider>;
  };

  const useContext = () => React.useContext(EntityContext);
  useContext.Context = EntityContext;
  useContext.Provider = EntityListProvider;
  return useContext;
};
