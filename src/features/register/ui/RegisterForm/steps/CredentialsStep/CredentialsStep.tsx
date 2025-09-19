import { useAppDispatch, useAppSelector } from "@/shared/lib";
import styles from "./CredentialsStep.module.scss";

import { selectRegisterEmail } from "../../../../model/selectors/selectRegisterEmail/selectRegisterEmail";
import { selectRegisterPhone } from "../../../../model/selectors/selectRegisterPhone/selectRegisterPhone";
import { selectRegisterIsLoading } from "../../../../model/selectors/selectRegisterIsLoading/selectRegisterIsLoading";
import { selectRegisterMethod } from "../../../../model/selectors/selectRegisterMethod/selectRegisterMethod";
import { selectRegisterError } from "../../../../model/selectors/selectRegisterError/selectRegisterError";
import { registerActions } from "@/features/register/model/slice/registerSlice";
import { AuthMethod } from "@/shared/config";
import { AppIcon, Button, Input, PhoneInput, Tabs } from "@/shared/ui";
import { useTranslation } from "react-i18next";

import MailIcon from "@/shared/assets/icons/Mail.svg?react";
import PhoneIcon from "@/shared/assets/icons/Phone.svg?react";
import ArrowRight from "@/shared/assets/icons/ArrowLeft.svg?react";
import type { FormEvent } from "react";
import { FormSteps } from "@/features/register/model/types/registerForm";

function CredentialsStep() {
  const dispatch = useAppDispatch();
  const { t } = useTranslation("auth");

  const email = useAppSelector(selectRegisterEmail);
  const phone = useAppSelector(selectRegisterPhone);
  const isLoading = useAppSelector(selectRegisterIsLoading);
  const method = useAppSelector(selectRegisterMethod);
  const error = useAppSelector(selectRegisterError);

  const handleChangeEmail = (value: string) => {
    dispatch(registerActions.setEmail(value));
  };

  const handleChangePhone = (value: string) => {
    dispatch(registerActions.setPhone(value));
  };

  const handleTabChange = () => {
    dispatch(
      registerActions.setMethod(
        method === AuthMethod.EMAIL ? AuthMethod.PHONE : AuthMethod.EMAIL
      )
    );
    dispatch(registerActions.resetForm());
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(registerActions.setStep(FormSteps.PASSWORD));
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <Tabs defaultValue={method} onChange={handleTabChange}>
        <Tabs.List>
          <Tabs.Trigger value={AuthMethod.EMAIL}>
            <AppIcon Icon={MailIcon} />
            {t("register.credentials.email")}
          </Tabs.Trigger>
          <Tabs.Trigger value={AuthMethod.PHONE}>
            <AppIcon Icon={PhoneIcon} />

            {t("register.credentials.phone")}
          </Tabs.Trigger>
        </Tabs.List>

        <Tabs.Content value={AuthMethod.EMAIL}>
          <Input
            label={t("register.credentials.email")}
            id="email"
            error={!!error}
            value={email}
            onChange={handleChangeEmail}
            disabled={isLoading}
            className={styles.input}
            placeholder={t("register.credentials.enterEmail")}
          />
        </Tabs.Content>
        <Tabs.Content value={AuthMethod.PHONE}>
          <PhoneInput
            label={t("register.credentials.phone")}
            id="phone"
            value={phone}
            error={!!error}
            disabled={isLoading}
            onChange={handleChangePhone}
            className={styles.input}
            placeholder={t("register.credentials.enterPhone")}
          />
        </Tabs.Content>
      </Tabs>

      {error && <div className={styles.error}>{error}</div>}
      <Button
        type="submit"
        className={styles.button}
        size="md"
        fullWidth
        isLoading={isLoading}
      >
        {t("register.continueButton")}
        <AppIcon Icon={ArrowRight} />
      </Button>
    </form>
  );
}

export default CredentialsStep;
