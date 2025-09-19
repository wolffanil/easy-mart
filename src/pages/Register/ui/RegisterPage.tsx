import { useTranslation } from "react-i18next";
import styles from "./RegisterPage.module.scss";
import {
  DynamicModuleLoader,
  useAppDispatch,
  useAppSelector,
} from "@/shared/lib";
import {
  FormSteps,
  registerActions,
  RegisterForm,
  registerReducer,
  selectRegisterStep,
  type FormStepsType,
} from "@/features/register";
import { AppIcon, Button } from "@/shared/ui";
import ArrowLeft from "@/shared/assets/icons/ArrowLeft.svg?react";
import { Link } from "react-router";
import { routePaths } from "@/shared/config";

const STEP_TITLES: Record<FormStepsType, string> = {
  [FormSteps.CREDENTIALS]: "register.credentials.title",
  [FormSteps.PASSWORD]: "register.password.title",
  [FormSteps.VERIFICATION]: "register.verification.title",
} as const;

function RegisterPage() {
  const { t } = useTranslation("auth");

  const step = useAppSelector(selectRegisterStep);
  const dispatch = useAppDispatch();

  const handleGoBackClick = () => {
    dispatch(registerActions.resetForm());
    dispatch(registerActions.setStep(FormSteps.CREDENTIALS));
  };

  const isCredentialStep = step === FormSteps.CREDENTIALS;

  const title = step ? STEP_TITLES[step] : STEP_TITLES[FormSteps.CREDENTIALS];

  return (
    <div className={styles.wrapper}>
      <div className={styles.main}>
        <DynamicModuleLoader
          reducers={{ registerForm: registerReducer }}
          removeAfterUnmount
        >
          {!isCredentialStep && (
            <Button
              onClick={handleGoBackClick}
              theme="tertiary"
              size="md"
              form="circle"
            >
              <AppIcon Icon={ArrowLeft} />
            </Button>
          )}
          <h1 className={styles.title}>{t(title)}</h1>
          <RegisterForm />
          {isCredentialStep && (
            <>
              <div className={styles.divider}>
                <div className={styles.line} />
                <span className={styles.dividerText}>{t("or")}</span>
                <div className={styles.line} />
              </div>
              <div className={styles.authServices}>
                {/* <AuthByGoogleButton /> */}
              </div>
              <span className={styles.footer}>
                {t("register.alreadyHaveAccount")}{" "}
                <Link className={styles.link} to={routePaths.login}>
                  {t("login.signIn")}
                </Link>
              </span>
            </>
          )}
        </DynamicModuleLoader>
      </div>
    </div>
  );
}

export default RegisterPage;
