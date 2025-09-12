import { useTranslation } from "react-i18next";

function LoginPage() {
  const { t } = useTranslation("login");

  return <div>{t("login")}</div>;
}

export default LoginPage;
