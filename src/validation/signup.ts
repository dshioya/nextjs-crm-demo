import * as yup from 'yup'
import SignupData from '@/model/SignupData';

export const signupValidationSchema: yup.Schema<SignupData> = yup.object().shape({
  name: yup.string().required(),
  loginId: yup.string().required(),
  password: yup.string().required(),
});
