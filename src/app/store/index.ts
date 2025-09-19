import { createStore } from "./config/store";
import {
  type StateSchema,
  type ReduxStoreWithManager,
  type StateSchemaKey,
} from "./config/StateSchema";
import { type AppDispatch } from "./config/store";

export { createStore };
export type { StateSchemaKey, StateSchema, ReduxStoreWithManager, AppDispatch };
