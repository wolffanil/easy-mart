import type {
  RegisterFormSchema,
  FormStepsType,
} from "./model/types/registerForm";
import { registerReducer, registerActions } from "./model/slice/registerSlice";
import RegisterForm from "./ui/RegisterForm/RegisterForm";
import { FormSteps } from "./model/types/registerForm";
import { selectRegisterStep } from "./model/selectors/selectRegisterStep/selectRegisterStep";

export type { RegisterFormSchema, FormStepsType };
export {
  registerActions,
  registerReducer,
  RegisterForm,
  FormSteps,
  selectRegisterStep,
};
