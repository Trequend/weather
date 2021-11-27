import { usePersistentStore } from '.';
import { STORE_KEYS } from '../app/persistent-store';

export function useCitiesIdsList() {
  const [ids, setIds] = usePersistentStore<Array<number>>(STORE_KEYS.CITIES);

  const addId = (id: number) => {
    setIds(ids ? [...ids, id] : [id]);
  };

  const removeId = (id: number) => {
    if (ids) {
      const index = ids.indexOf(id);
      if (index !== -1) {
        const copy = [...ids];
        copy.splice(index, 1);
        setIds(copy);
      }
    }
  };

  return {
    ids: ids ?? [],
    addId,
    removeId,
  };
}
