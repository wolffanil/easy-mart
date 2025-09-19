import { useState, type FormEvent } from "react";
import { passwordRequirements } from "@/features/register/config/passwordRequirements";
import { selectRegisterEmail } from "@/features/register/model/selectors/selectRegisterEmail/selectRegisterEmail";
import { selectRegisterIsLoading } from "@/features/register/model/selectors/selectRegisterIsLoading/selectRegisterIsLoading";
import { selectRegisterPassword } from "@/features/register/model/selectors/selectRegisterPassword/selectRegisterPassword";
import { selectRegisterPhone } from "@/features/register/model/selectors/selectRegisterPhone/selectRegisterPhone";
import { registerActions } from "@/features/register/model/slice/registerSlice";
import { cn, useAppDispatch, useAppSelector } from "@/shared/lib";

import styles from "./CreatePasswordStep.module.scss";
import { AppIcon, Button, Input } from "@/shared/ui";
import { useTranslation } from "react-i18next";
import { register } from "../../../../model/services/register";

import CheckIcon from "@/shared/assets/icons/Check.svg?react";
import ArrowRight from "@/shared/assets/icons/ArrowRight.svg?react";

function CreatePasswordStep() {
  const [validationError, setValidationError] = useState(true);

  const { t } = useTranslation("auth");

  const email = useAppSelector(selectRegisterEmail);
  const phone = useAppSelector(selectRegisterPhone);
  const isLoading = useAppSelector(selectRegisterIsLoading);
  const password = useAppSelector(selectRegisterPassword);

  const dispatch = useAppDispatch();

  const handleChangePassword = (value: string) => {
    dispatch(registerActions.setPassword(value));

    const isValid = passwordRequirements.every((req) => req.test(value));

    if (!isValid) {
      setValidationError(true);
    } else {
      setValidationError(false);
    }
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!validationError && password) {
      dispatch(register({ email, phone, password }));
    }
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <Input
        disabled={isLoading}
        label={t("register.password.title")}
        type="password"
        className={styles.input}
        placeholder={t("register.password.enterPassword")}
        onChange={handleChangePassword}
        value={password}
      />
      <div className={styles.requirementsList}>
        {passwordRequirements.map((req) => {
          const isMet = req.test(password ?? "");
          return (
            <div className={styles.requirement} key={req.key}>
              <AppIcon
                size={16}
                className={cn(styles.requirementIcon, {
                  [styles.met]: isMet,
                })}
                Icon={CheckIcon}
              />
              <span className={styles.requirementText}>{t(req.key)}</span>
            </div>
          );
        })}
      </div>
      <Button
        type="submit"
        className={styles.button}
        disabled={validationError}
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

export default CreatePasswordStep;
