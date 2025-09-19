import { Suspense, useEffect } from "react";
import { AppRouter } from "./providers";
import { useAppDispatch } from "@/shared/lib";
import { refreshSession, userActions } from "@/entities/user";
import { setAuthFailureHandler } from "@/shared/api";

function App() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(userActions.initUserData());
    dispatch(refreshSession());
    setAuthFailureHandler(() => {
      dispatch(userActions.clearUserData());
    });
  }, [dispatch]);

  return (
    <Suspense fallback={<></>}>
      <AppRouter />
    </Suspense>
  );
}

export default App;
