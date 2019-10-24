import React, { createContext, Children, useContext } from 'react';
import { useEntityCollection } from '../useEntityCollection';
import { buildApiService } from '../../../services/ApiService';
import { Host } from '../../../models/host';
import { entityCollection } from '../ContentManagerModels';

const defaultHost: Omit<Host, 'id'> = {
  name: '',
  blurb: '',
  contactInfo: '',
  address: ''
};

const hostService = buildApiService<Host>('/host');

export const GroupManagerContext = createContext<entityCollection<Host>>({} as entityCollection<Host>);

const GroupManagerProvider = (props: { children: JSX.Element }) => {
  const entityCollection = useEntityCollection(hostService, defaultHost, '/Admin/host');

  return <GroupManagerContext.Provider value={entityCollection}>{props.children}</GroupManagerContext.Provider>;
};

const useGroupManagerContext = () => useContext(GroupManagerContext);

export { GroupManagerProvider, useGroupManagerContext };
