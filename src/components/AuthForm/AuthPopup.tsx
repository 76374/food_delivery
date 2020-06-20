import React from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Spinner from 'react-bootstrap/Spinner';
import Alert from 'react-bootstrap/Alert';
import Locale from '../../service/Locale';
import LocaleKey from '../../const/LocaleKey';

const AuthPopup = (props: AuthPopupProps) => {
  return (
    <Modal show onHide={props.onCancel}>
      <Modal.Header>
        <h5>{props.header}</h5>
      </Modal.Header>
      <Modal.Body>
        {props.error && <Alert variant="danger">{props.error}</Alert>}
        {props.content}
      </Modal.Body>
      <Modal.Footer className="">
        {props.isLoading ? (
          <Spinner animation="border" variant="primary" />
        ) : (
          <>
            <Button onClick={props.onSubmit} disabled={props.submitDisabled}>
              {props.submitText}
            </Button>
            <Button onClick={props.onCancel} variant="outline-primary">
              {Locale.get(LocaleKey.GENERIC_BT_CANCEL)}
            </Button>
          </>
        )}
      </Modal.Footer>
    </Modal>
  );
};

interface AuthPopupProps {
  header: string;
  content: JSX.Element;
  error: String | null;
  submitText: string;
  isLoading: boolean;
  submitDisabled: boolean;
  onCancel(): void;
  onSubmit(): void;
}

export default AuthPopup;
