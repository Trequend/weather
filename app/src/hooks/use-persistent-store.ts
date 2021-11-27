import { useEffect, useState } from 'react';
import { ChangeListener, persistentStore } from '../app/persistent-store';

export function usePersistentStore<T>(
  name: string
): [T | undefined, (value: T | undefined) => void] {
  const [value, setValue] = useState<T | undefined>(() => {
    const item = persistentStore.getItem(name);
    if (item === undefined) {
      return undefined;
    } else {
      return JSON.parse(item) as T;
    }
  });

  useEffect(() => {
    const listener: ChangeListener = (key, value) => {
      if (name === key) {
        if (value === undefined) {
          setValue(undefined);
        } else {
          setValue(JSON.parse(value));
        }
      }
    };

    persistentStore.addChangeListener(listener);
    return () => {
      persistentStore.removeChangeListener(listener);
    };
  }, [name]);

  return [
    value,
    (value: T | undefined) => {
      persistentStore.setItem(
        name,
        value === undefined ? undefined : JSON.stringify(value)
      );
    },
  ];
}
