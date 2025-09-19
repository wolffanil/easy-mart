import { AppIcon, Button, Input, PhoneInput, Tabs } from "@/shared/ui";
import styles from "./LoginForm.module.scss";
import { AuthMethod, routePaths } from "@/shared/config";
import { useTranslation } from "react-i18next";
import { useAppDispatch, useAppSelector } from "@/shared/lib";
import { selectLoginEmail } from "../../model/selectors/selectLoginEmail/selectLoginEmail";
import { selectLoginPhone } from "../../model/selectors/selectLoginPhone/selectLoginPhone";
import { selectLoginPassword } from "../../model/selectors/selectLoginPassword/selectLoginPassword";
import { selectLoginMethod } from "../../model/selectors/selectLoginMethod/selectLoginMethod";
import { loginActions } from "../../model/slice/loginSlice";
import type { FormEvent } from "react";

import MailIcon from "@/shared/assets/icons/Mail.svg?react";
import PhoneIcon from "@/shared/assets/icons/Phone.svg?react";
import ArrowRightIcon from "@/shared/assets/icons/ArrowRight.svg?react";
import { login } from "../../model/services/login";
import { useNavigate } from "react-router";
import { selectLoginIsLoading } from "../../model/selectors/selectLoginIsLoading/selectLoginIsLoading";
import { selectLoginError } from "../../model/selectors/selectLoginError/selectLoginError";

function LoginForm() {
  const { t } = useTranslation("auth");
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const email = useAppSelector(selectLoginEmail);
  const phone = useAppSelector(selectLoginPhone);
  const password = useAppSelector(selectLoginPassword);
  const method = useAppSelector(selectLoginMethod);
  const isLoading = useAppSelector(selectLoginIsLoading);
  const error = useAppSelector(selectLoginError);

  const handleChangeEmail = (value: string) => {
    dispatch(loginActions.setEmail(value));
  };
  const handleChangePhone = (value: string) => {
    dispatch(loginActions.setPhone(value));
  };
  const handleChangePassword = (value: string) => {
    dispatch(loginActions.setPassword(value));
  };

  const handleTabChange = () => {
    dispatch(
      loginActions.setMethod(
        method === AuthMethod.EMAIL ? AuthMethod.PHONE : AuthMethod.EMAIL
      )
    );
    dispatch(loginActions.resetForm());
  };

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const result = await dispatch(login({ email, phone, password }));

    if (login.fulfilled.match(result)) {
      navigate(routePaths.home);
    }
  };

  return (
    <form className={styles.form} onSubmit={onSubmit}>
      <Tabs defaultValue={method} onChange={handleTabChange}>
        <Tabs.List>
          <Tabs.Trigger value={AuthMethod.EMAIL}>
            <AppIcon Icon={MailIcon} />
            {t("login.email")}
          </Tabs.Trigger>
          <Tabs.Trigger value={AuthMethod.PHONE}>
            <AppIcon Icon={PhoneIcon} />

            {t("login.phone")}
          </Tabs.Trigger>
        </Tabs.List>
        <Tabs.Content value={AuthMethod.EMAIL}>
          <Input
            label={t("login.email")}
            id="email"
            error={!!error}
            value={email}
            onChange={handleChangeEmail}
            disabled={isLoading}
            className={styles.input}
            placeholder={t("login.enterEmail")}
          />
        </Tabs.Content>
        <Tabs.Content value={AuthMethod.PHONE}>
          <PhoneInput
            label={t("login.phone")}
            id="phone"
            value={phone}
            error={!!error}
            disabled={isLoading}
            onChange={handleChangePhone}
            className={styles.input}
          />
        </Tabs.Content>
      </Tabs>

      <Input
        id="password"
        type="password"
        label={t("login.password")}
        value={password}
        onChange={handleChangePassword}
        className={styles.input}
        placeholder={t("login.enterPassword")}
      />
      {error && <div className={styles.error}>{error}</div>}
      <Button
        type="submit"
        className={styles.button}
        size="md"
        fullWidth
        isLoading={isLoading}
      >
        {t("login.loginButton")}
        <AppIcon Icon={ArrowRightIcon} />
      </Button>
    </form>
  );
}

export default LoginForm;
