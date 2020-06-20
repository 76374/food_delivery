import React, { ChangeEvent } from 'react';
import InputGroup from 'react-bootstrap/InputGroup';
import Form from 'react-bootstrap/Form';
import FormControl from 'react-bootstrap/FormControl';

const AuthForm = (props: AuthFormProps) => {
  const fields = props.fields.map((field) => (
    <InputGroup className="mb-3" key={'AuthInput-' + field.placeholder}>
      <FormControl
        placeholder={field.placeholder}
        isInvalid={!!field.error}
        isValid={props.showValid && !field.error}
        onChange={(e: ChangeEvent<HTMLInputElement>) => field.onChange(e.target.value)}
        type={field.isPassword ? "password" : undefined}
      />
      <Form.Control.Feedback type="invalid">{field.error}</Form.Control.Feedback>
    </InputGroup>
  ));
  return <>{fields}</>;
};

interface AuthFormProps {
  fields: AuthFormFieldProps[];
  showValid: boolean;
}

interface AuthFormFieldProps {
  placeholder: string;
  error: string | null;
  onChange(value: string): void;
  isPassword?: boolean
}

export default AuthForm;
