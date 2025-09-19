import { createStore, type StateSchema } from "@/app/store";
import type { ReactNode } from "react";
import { Provider } from "react-redux";

interface StoreProviderProps {
  children: ReactNode;
  initialState?: StateSchema;
}

function StoreProvider({ children, initialState }: StoreProviderProps) {
  const store = createStore(initialState);

  return <Provider store={store}>{children}</Provider>;
}

export default StoreProvider;
