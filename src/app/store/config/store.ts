import {
  configureStore,
  type ReducersMapObject,
  type ThunkDispatch,
  type UnknownAction,
} from "@reduxjs/toolkit";
import type { ReduxStoreWithManager, StateSchema } from "./StateSchema";
import { userReducer } from "@/entities/user";
import type { DeepPartial } from "@/shared/lib";
import { createReducerManager } from "./reducerManager";

export const createStore = (
  initialState?: StateSchema,
  asyncReducers?: DeepPartial<ReducersMapObject<StateSchema>>
) => {
  const rootReducer: ReducersMapObject<StateSchema> = {
    user: userReducer,
    ...(asyncReducers as Partial<ReducersMapObject<StateSchema>>),
  };

  const reducerManager = createReducerManager(rootReducer);

  const store = configureStore<StateSchema>({
    preloadedState: initialState,
    reducer: (state, action) => {
      return reducerManager.reduce(state ?? ({} as StateSchema), action);
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
    devTools: true,
  }) as ReduxStoreWithManager;

  store.reducerManager = reducerManager;

  return store;
};

export type AppDispatch = ThunkDispatch<StateSchema, unknown, UnknownAction>;
