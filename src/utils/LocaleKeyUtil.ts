import { EmailValidationError, PwdValidationError, NameValidationError, ValidationError } from './validator';
import LocaleKey from '../const/LocaleKey';

const getAuthErrorKey = (error: ValidationError): string | null => {
  switch (error) {
    case EmailValidationError.IsEmpty:
    case PwdValidationError.IsEmpty:
    case NameValidationError.IsEmpty:
      return LocaleKey.AUTH_INPUT_EMPTY_FIELD;
    case EmailValidationError.InvalidFormat:
      return LocaleKey.AUTH_INPUT_INVALID_EMAIL;
    case PwdValidationError.TooLong:
      return LocaleKey.AUTH_INPUT_PWD_LONG;
    case PwdValidationError.TooShort:
      return LocaleKey.AUTH_INPUT_PWD_SHORT;
    case NameValidationError.TooShort:
      return LocaleKey.AUTH_INPUT_NAME_SHORT;
    case NameValidationError.TooLong:
      return LocaleKey.AUTH_INPUT_NAME_LONG;
    case NameValidationError.InvalidCharacter:
      return LocaleKey.AUTH_INPUT_INVALID_CHARACTER;
    default:
      return null;
  }
};

export { getAuthErrorKey };
