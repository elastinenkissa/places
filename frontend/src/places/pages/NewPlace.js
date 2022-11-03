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
    },
    false
  );

  const addNewPlaceHandler = async (event) => {
    event.preventDefault();
    try {
      const newPlace = await sendRequest(
        '/api/places',
        'POST',
        JSON.stringify({
          title: formState.inputs.title.value,
          description: formState.inputs.description.value,
          address: formState.inputs.address.value,
          coordinates: {
            lng: 45,
            lat: 45,
          },
          imageUrl:
            'https://th.bing.com/th/id/R.ba91011e61cf6fa0cad7eeb5c33b6124?rik=erb%2bbAjfZva8ow&riu=http%3a%2f%2f3.bp.blogspot.com%2f-QdewDml24mU%2fUNLr9i1KZGI%2fAAAAAAAACI8%2feqJLL9jC7BU%2fs1600%2f15816-dystopia.jpg&ehk=1ZGDWV5eznz78zzM%2bwdAmCON4CrleTbEbOoVubrXpis%3d&risl=&pid=ImgRaw&r=0',
          userId: auth.user.id,
        }),
        { 'Content-Type': 'application/json' }
      );
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
