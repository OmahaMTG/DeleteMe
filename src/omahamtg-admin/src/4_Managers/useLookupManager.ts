import { buildLookupAccessor } from '../6_Accessors/lookupAccessor';

interface ILookupState<K, V> {
  name: K;
  value: V;
}

const useLookupManager = <K, V, T>(url: string, mapResultToState: (x: T) => ILookupState<K, V>) => {
  const lookupAccessor = buildLookupAccessor<T>(url);

  // const [lookupState, setLookupState] = useState<ILookupState<K, V>[]>([]);
  // const [filterState, setFilterState] = useState<string>('');

  // useEffect(() => {
  //   (async () => {
  //     const apiResult = await lookupAccessor.queryLookup(filterState);

  //     setLookupState(apiResult.map(mapResultToState));
  //   })();
  // }, [lookupAccessor, filterState, mapResultToState]);

  const fetchLookups = async (filter: string) => {
    const apiResult = await lookupAccessor.queryLookup(filter);
    return apiResult.map(mapResultToState);
  };

  return [fetchLookups];
};

export { useLookupManager };
