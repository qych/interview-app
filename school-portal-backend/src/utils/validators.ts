import { body } from "express-validator";
import { Regex } from "school-portal-common";

// TODO #3: Add BE validation for contact number

export interface NullableOptions {
  nullable?: boolean;
}

export interface EmptiableOptions extends NullableOptions {
  emptiable?: boolean;
}

export interface ValidateStringOptions extends EmptiableOptions {
  minLength?: number;
  maxLength?: number;
  regex?: RegExp;
}

export const validateString = {
  body: (name: string, options?: ValidateStringOptions) => body(name)
    .custom(value => validateStringFn(value, options)).customSanitizer(value => sanitizeStringFn(value)),
};

const sanitizeStringFn = (value?: any) => {
  if (!value || value === null) {
    return value;
  }
  return value.trim();
};

const validateNullable = (value: any, options?: NullableOptions) => {
  if (value === null) {
    if (!options?.nullable) {
      throw new Error('Must not be null');
    }
    return true;
  }
  return false;
};

const validateStringEmptiable = (value: string, options?: EmptiableOptions) => {
  if (value.trim().length === 0) {
    if (!options?.emptiable) {
      throw new Error('Must not be empty');
    }
    return true;
  }
  return false;
};

const validateStringFn = (value: any, options?: ValidateStringOptions) => {
  if (validateNullable(value, options)) {
    return true;
  }
  if (typeof value !== 'string') {
    throw new Error('Must be string');
  }
  if (validateStringEmptiable(value, options)) {
    return true;
  }
  if (options?.minLength != null && value.length < options.minLength) {
    throw new Error(`Must not be shorter than ${options.minLength} character(s)`);
  }
  if (options?.maxLength != null && value.length > options.maxLength) {
    throw new Error(`Must not be longer than ${options.maxLength} character(s)`);
  }
  if (options?.regex) {
    if (!options.regex.test(value)) {
      throw new Error('Invalid format');
    }
  }
  return true;
};

const buildRegexValidator = (regex: RegExp, maxLength?: number) => ({
  body: (name: string, options?: EmptiableOptions) => body(name)
    .custom(value => validateStringFn(value, { ...options, regex, maxLength })).customSanitizer(value => sanitizeStringFn(value))
});

export const validateEmail = buildRegexValidator(Regex.EMAIL);
