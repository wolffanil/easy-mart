import { useAppSelector } from "@/shared/lib";
import { selectRegisterStep } from "../../model/selectors/selectRegisterStep/selectRegisterStep";
import { FormSteps } from "../../model/types/registerForm";
import CredentialsStep from "./steps/CredentialsStep/CredentialsStep";
import CreatePasswordStep from "./steps/CreatePasswordStep/CreatePasswordStep";
import VerificationStep from "./steps/VerificationStep/VerificationStep";

function RegisterForm() {
  const step = useAppSelector(selectRegisterStep);

  return (
    <>
      {step === FormSteps.CREDENTIALS && <CredentialsStep />}
      {step === FormSteps.PASSWORD && <CreatePasswordStep />}
      {step === FormSteps.VERIFICATION && <VerificationStep />}
    </>
  );
}

export default RegisterForm;
