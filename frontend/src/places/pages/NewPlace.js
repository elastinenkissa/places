import Input from '../../shared/components/FormElements/Input';
import Button from '../../shared/components/FormElements/Button';

import { VALIDATOR_MINLENGTH, VALIDATOR_REQUIRE } from '../../util/validators';
import { useForm } from '../../shared/hooks/useForm';
import Form from '../../shared/components/FormElements/Form';
import styled from 'styled-components';
import React, { useContext } from 'react';
import { useHttp } from '../../shared/hooks/useHttp';
import { AuthContext } from '../../shared/context/auth-context';
import ErrorModal from '../../shared/components/UIElements/ErrorModal';
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner';
import { useNavigate } from 'react-router-dom';
import ImageUpload from '../../shared/components/FormElements/ImageUpload';

const NewPlace = () => {
  const { loading, error, sendRequest, clearError } = useHttp();

  const redirect = useNavigate();

  const auth = useContext(AuthContext);

  const [formState, inputHandler] = useForm(
    {
      title: {
        value: '',
        isValid: false,
      },
      description: {
        value: '',
        isValid: false,
      },
      address: {
        value: '',
        isValid: false,
      },
      image: {
        value: null,
        isValid: false,
      },
    },
    false
  );

  const addNewPlaceHandler = async (event) => {
    event.preventDefault();
    try {
      const formData = new FormData();
      formData.append('title', formState.inputs.title.value);
      formData.append('description', formState.inputs.description.value);
      formData.append('address', formState.inputs.address.value);
      formData.append('image', formState.inputs.image.value);
      formData.append('userId', auth.user.id);

      const newPlace = await sendRequest('/api/places', 'POST', formData, {
        Authorization: `Bearer ${auth.user.token}`,
      });
      console.log(newPlace);
      auth.updateUser({
        ...auth.user,
        places: auth.user.places.concat(newPlace.id),
      });
      redirect(`/${auth.user.id}/places`);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <ErrorModal error={error} onClear={clearError} />
      {loading && <LoadingSpinner />}
      <Form onSubmit={addNewPlaceHandler}>
        <Input
          id="title"
          type="text"
          label="Title"
          element="input"
          validators={[VALIDATOR_REQUIRE()]}
          errorText="Please enter a valid title"
          onInput={inputHandler}
        />
        <Input
          id="description"
          label="Description"
          element="textarea"
          validators={[VALIDATOR_MINLENGTH(10)]}
          errorText="Please enter a valid description. (Minimum 10 characters)"
          onInput={inputHandler}
        />
        <Input
          id="address"
          label="Address"
          element="input"
          validators={[VALIDATOR_REQUIRE()]}
          errorText="Please enter a valid address."
          onInput={inputHandler}
        />
        <ImageUpload id="image" center onInput={inputHandler} />
        <StyledButton inverse type="submit" disabled={!formState.isValid}>
          Create place
        </StyledButton>
      </Form>
    </>
  );
};

export default NewPlace;

const StyledButton = styled(Button)`
  @media (max-width: 768px) {
    width: 100%;
  }
`;
