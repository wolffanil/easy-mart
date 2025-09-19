import { useTranslation } from "react-i18next";
import styles from "./LoginPage.module.scss";
import { LoginForm, loginReducer } from "@/features/login";
import { DynamicModuleLoader } from "@/shared/lib";

function LoginPage() {
  const { t } = useTranslation("auth");

  return (
    <div className={styles.wrapper}>
      <div className={styles.main}>
        <h1 className={styles.title}>{t("login.signIn")}</h1>
        <DynamicModuleLoader
          reducers={{ loginForm: loginReducer }}
          removeAfterUnmount
        >
          <LoginForm />
        </DynamicModuleLoader>
      </div>
    </div>
  );
}

export default LoginPage;
