import type {
  ReduxStoreWithManager,
  StateSchema,
  StateSchemaKey,
} from "@/app/store";
import type { Reducer } from "@reduxjs/toolkit";
import { useEffect, type ReactNode } from "react";
import { useStore } from "react-redux";
import { useAppDispatch } from "../redux/hooks";

export type ReducersList = {
  [name in StateSchemaKey]?: Reducer<NonNullable<StateSchema[name]>>;
};

interface DynamicModuleLoaderProps {
  reducers: ReducersList;
  removeAfterUnmount?: boolean;
  children: ReactNode;
}

function DynamicModuleLoader({
  reducers,
  removeAfterUnmount,
  children,
}: DynamicModuleLoaderProps) {
  const store = useStore() as ReduxStoreWithManager;
  const dispatch = useAppDispatch();

  useEffect(() => {
    const mounted = store.reducerManager.getMountedReducers();
    Object.entries(reducers).forEach(([name, reducer]) => {
      const key = name as StateSchemaKey;
      if (!mounted[key]) {
        store.reducerManager.add(key, reducer);
        dispatch({ type: `@INIT async reducer ${key}` });
      }
    });

    return () => {
      if (!removeAfterUnmount) return;
      Object.entries(reducers).forEach(([name]) => {
        const key = name as StateSchemaKey;
        store.reducerManager.remove(key);
        dispatch({ type: `@DESTROY async reducer ${key}` });
      });
    };
  }, []);

  return children;
}

export default DynamicModuleLoader;
