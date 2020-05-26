enum GenericError {
  None = 0,
  IsEmpty = 1
}

enum EmailValidationError {
  None = GenericError.None,
  IsEmpty = GenericError.IsEmpty,
  InvalidFormat = 10,
}

enum NameValidationError {
  None = GenericError.None,
  IsEmpty = GenericError.IsEmpty,
  TooShort = 20,
  TooLong = 21,
  InvalidCharacter = 22,
}

enum PwdValidationError {
  None = GenericError.None,
  IsEmpty = GenericError.IsEmpty,
  TooShort = 30,
  TooLong = 31,
}

const emailValidator = (): ((value: string) => EmailValidationError) => {
  const regex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return (value) => {
    if (!value) {
      return EmailValidationError.IsEmpty;
    }
    if (!regex.test(value)) {
      return EmailValidationError.InvalidFormat;
    }
    return EmailValidationError.None;
  };
};

const nameValidator = (
  min: number = 2,
  max: number = 16
): ((value: string) => NameValidationError) => {
  const regex = /[^\u0400-\u04FFa-zA-Z-]/;
  return (value: string) => {
    if (value.length < min) {
      return NameValidationError.TooShort;
    }
    if (value.length > max) {
      return NameValidationError.TooLong;
    }
    if (regex.test(value)) {
      return NameValidationError.InvalidCharacter;
    }
    return NameValidationError.None;
  };
};

const pwdValidator = (
  min: number = 6,
  max: number = 128
): ((value: string) => PwdValidationError) => {
  return (value: string) => {
    if (!value) {
      return PwdValidationError.IsEmpty;
    }
    if (value.length < min) {
      return PwdValidationError.TooShort;
    }
    if (value.length > max) {
      return PwdValidationError.TooLong;
    }
    return PwdValidationError.None;
  };
};

export {
  emailValidator,
  EmailValidationError,
  nameValidator,
  NameValidationError,
  pwdValidator,
  PwdValidationError,
};
