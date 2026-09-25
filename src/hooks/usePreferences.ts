import { useMMKVBoolean, useMMKVNumber, useMMKVString } from 'react-native-mmkv';

import { storage } from '../storage/mmkv';

export type SortOrder = 'name' | 'price';

const SORT_ORDER_KEY = 'preferences.sortOrder';
const COMPACT_MODE_KEY = 'preferences.compactMode';
const ITEMS_PER_PAGE_KEY = 'preferences.itemsPerPage';

export function usePreferences() {
  const [sortOrder, setSortOrder] = useMMKVString(
    SORT_ORDER_KEY,
    storage,
  );

  const [compactMode, setCompactMode] = useMMKVBoolean(
    COMPACT_MODE_KEY,
    storage,
  );

  const [itemsPerPage, setItemsPerPage] = useMMKVNumber(
    ITEMS_PER_PAGE_KEY,
    storage,
  );

  return {
    sortOrder: (sortOrder as SortOrder | undefined) ?? 'name',
    compactMode: compactMode ?? false,
    itemsPerPage: itemsPerPage ?? 10,

    setSortOrder: (value: SortOrder) => {
      setSortOrder(value);
    },

    setCompactMode: (value: boolean) => {
      setCompactMode(value);
    },

    setItemsPerPage: (value: number) => {
      setItemsPerPage(value);
    },
  };
}
