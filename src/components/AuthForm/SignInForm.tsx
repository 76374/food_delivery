import React, { ChangeEvent } from 'react';
import { useLocalStore, observer } from 'mobx-react';
import Modal from 'react-bootstrap/Modal';
import InputGroup from 'react-bootstrap/InputGroup';
import Form from 'react-bootstrap/Form';
import FormControl from 'react-bootstrap/FormControl';
import Button from 'react-bootstrap/Button';
import Spinner from 'react-bootstrap/Spinner';
import Locale from '../../service/Locale';
import LocaleKey from '../../const/LocaleKey';
import SignInData from '../../dto/SignInData';
import {
  emailValidator,
  EmailValidationError,
  pwdValidator,
  PwdValidationError,
} from '../../utils/validator';
import { getAuthErrorKey } from '../../utils/LocaleKeyUtil';

const validateEmail: (value: string) => EmailValidationError = emailValidator();
const validatePwd: (value: string) => PwdValidationError = pwdValidator();

const getLocale = (key: string | null): string | null => {
  return key ? Locale.get(key) : null;
};

const SignInForm = (props: SignInProps) => {
  const localStore = useLocalStore(() => ({
    email: '',
    emailError: EmailValidationError.None,
    pwd: '',
    pwdError: PwdValidationError.None,
    validated: false,
    submited: false,
  }));

  //const onEmailChanged = (value: string): void => {
  const onEmailChanged = (event: ChangeEvent<HTMLInputElement>): void => {
    const email = event.target.value;
    localStore.email = email;
    if (localStore.validated) {
      localStore.emailError = validateEmail(email);
    }
  };
  const onPwdChanged = (event: ChangeEvent<HTMLInputElement>): void => {
    const pwd = event.target.value;
    localStore.pwd = pwd;
    if (localStore.validated) {
      localStore.pwdError = validatePwd(pwd);
    }
  };
  const onSubmit = () => {
    localStore.validated = true;
    localStore.emailError = validateEmail(localStore.email);
    localStore.pwdError = validatePwd(localStore.pwd);

    const hasError = localStore.emailError || localStore.pwdError;
    if (!hasError) {
      localStore.submited = true;
      props.onSubmit({
        email: localStore.email,
        pwd: localStore.pwd,
      });
    }
  };

  return (
    <Modal show onHide={props.onCancel}>
      <Modal.Header><h5>{Locale.get(LocaleKey.AUTH_TITLE_SIGN_IN)}</h5></Modal.Header>
      <Modal.Body>
        <InputGroup className="mb-3">
          <FormControl
            placeholder={Locale.get(LocaleKey.AUTH_INPUT_EMAIL)}
            isInvalid={localStore.emailError !== EmailValidationError.None}
            isValid={localStore.validated && localStore.emailError === EmailValidationError.None}
            onChange={onEmailChanged}
          />
          <Form.Control.Feedback type="invalid">
            {getLocale(getAuthErrorKey(localStore.emailError))}
          </Form.Control.Feedback>
        </InputGroup>
        <InputGroup className="mb-3">
          <FormControl
            placeholder={Locale.get(LocaleKey.AUTH_INPUT_PWD)}
            isInvalid={localStore.pwdError !== PwdValidationError.None}
            isValid={localStore.validated && localStore.pwdError === PwdValidationError.None}
            onChange={onPwdChanged}
          />
          <Form.Control.Feedback type="invalid">
            {getLocale(getAuthErrorKey(localStore.pwdError))}
          </Form.Control.Feedback>
        </InputGroup>
      </Modal.Body>
      <Modal.Footer className="">
        {localStore.submited ? (
          <Spinner animation="border" variant="primary" />
        ) : (
          <Button onClick={onSubmit}>{Locale.get(LocaleKey.AUTH_BT_SIGN_IN)}</Button>
        )}
      </Modal.Footer>
    </Modal>
  );
};

interface SignInProps {
  onSubmit(signInData: SignInData): void;
  onCancel(): void;
}

export default observer(SignInForm);
