import React, { useState, useContext } from 'react';
import styled from 'styled-components';
import Button from '../../shared/components/FormElements/Button';
import Input from '../../shared/components/FormElements/Input';
import Form from '../../shared/components/FormElements/Form';
import { useForm } from '../../shared/hooks/useForm';
import {
  VALIDATOR_EMAIL,
  VALIDATOR_MINLENGTH,
  VALIDATOR_REQUIRE,
} from '../../util/validators';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../shared/context/auth-context';
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner';
import ErrorModal from '../../shared/components/UIElements/ErrorModal';
import { useHttp } from '../../shared/hooks/useHttp';

const Login = (props) => {
  const [isNewUser, setIsNewUser] = useState(false);
  const { loading, error, sendRequest, clearError } = useHttp();

  const auth = useContext(AuthContext);

  const [formState, inputHandler] = useForm(
    {
      name: {
        value: '',
        isValid: isNewUser ? false : true,
      },
      email: {
        value: '',
        isValid: false,
      },
      password: {
        value: '',
        isValid: false,
      },
    },
    false
  );

  const switchModeHandler = () => {
    setIsNewUser(!isNewUser);
  };

  const redirect = useNavigate();

  const loginHandler = async (event) => {
    event.preventDefault();

    if (isNewUser) {
      try {
        const data = await sendRequest(
          '/api/users/signup',
          'POST',
          JSON.stringify({
            name: formState.inputs.name.value,
            email: formState.inputs.email.value,
            password: formState.inputs.password.value,
          }),
          {
            'Content-Type': 'application/json',
          }
        );
        auth.login(data.user);
        redirect('/');
      } catch (error) {
        console.log(error);
      }
    }

    if (!isNewUser) {
      try {
        const data = await sendRequest(
          '/api/users/login',
          'POST',
          JSON.stringify({
            email: formState.inputs.email.value,
            password: formState.inputs.password.value,
          }),
          {
            'Content-Type': 'application/json',
          }
        );
        auth.login(data.user);
        redirect('/');
      } catch (error) {
        console.log(error);
      }
    }
  };

  const headingText = isNewUser
    ? 'Register an account.'
    : 'Log in to share places.';

  const footerText = isNewUser
    ? 'Already have an account? Log in.'
    : 'New to Places? Create an account.';

  const buttonText = isNewUser ? 'SIGN UP' : 'LOGIN';

  return (
    <>
      {error && <ErrorModal onClear={clearError} error={error} />}
      {loading && <LoadingSpinner />}
      <Heading>{headingText}</Heading>
      <StyledForm onSubmit={loginHandler}>
        {isNewUser && (
          <Input
            id="name"
            element="input"
            type="name"
            label="Name"
            validators={[VALIDATOR_REQUIRE()]}
            errorText="Please enter a valid email."
            onInput={inputHandler}
            value={formState.inputs.name.value}
            valid={formState.inputs.name.isValid}
          />
        )}
        <Input
          id="email"
          element="input"
          type="email"
          label="Email"
          validators={[VALIDATOR_EMAIL()]}
          errorText="Please enter a valid email."
          onInput={inputHandler}
          value={formState.inputs.email.value}
          valid={formState.inputs.email.isValid}
        />
        <Input
          id="password"
          element="input"
          type="password"
          label="Password"
          validators={[VALIDATOR_MINLENGTH(6)]}
          errorText="Password must be at least 6 characters long."
          onInput={inputHandler}
          value={formState.inputs.password.value}
          valid={formState.inputs.password.isValid}
        />
        <FormFooter>
          <StyledButton inverse type="submit" disabled={!formState.isValid}>
            {buttonText}
          </StyledButton>
          <SwitchButton onClick={switchModeHandler}>{footerText}</SwitchButton>
        </FormFooter>
      </StyledForm>
    </>
  );
};

const StyledButton = styled(Button)`
  @media (max-width: 768px) {
    width: 100%;
  }
`;

const StyledForm = styled(Form)`
  @media (max-width: 768px) {
    height: 80vw;
  }
`;

const SwitchButton = styled.p`
  &:hover {
    cursor: pointer;
  }
`;

const FormFooter = styled.div`
  @media (max-width: 768px) {
    display: block;
  }

  display: flex;
  justify-content: space-between;
`;

const Heading = styled.h2`
  text-align: center;
  color: white;
  padding: 2rem;
`;

export default Login;
