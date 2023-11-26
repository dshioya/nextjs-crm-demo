import * as yup from 'yup'

export async function validate<T = Record<string, any>>(
  scheme: yup.Schema<T>,
  data: Record<string, any> | null
) {
  try {
    await scheme.validate(data, { abortEarly: false });

    return {
      isValid: true
    };
  } catch (error) {
    if (error instanceof yup.ValidationError) {
      return { isValid: false, errors: error.errors }
    } else {
      return { isValid: false }
    }
  }
}
