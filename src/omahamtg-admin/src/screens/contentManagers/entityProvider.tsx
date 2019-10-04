import React, { createContext } from 'react';
import { IApiService } from '../../services/serviceContracts';
import { useEntityList } from './useEntityList';

 
export const EntityListContext = createContext({null});

export const EntityListProvider = <T extends {}>(apiService: IApiService<T>, defaultEntity: T) => {
  const hook = useEntityList(apiService, defaultEntity);
  return <EntityListContext.Provider value={hook}>{children}</EntityListContext.Provider>;
};

