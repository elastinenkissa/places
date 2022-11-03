import React, { useEffect, useState, useContext } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Button from '../../shared/components/FormElements/Button';
import Input from '../../shared/components/FormElements/Input';
import { useForm } from '../../shared/hooks/useForm';
import { VALIDATOR_MINLENGTH, VALIDATOR_REQUIRE } from '../../util/validators';
import Form from '../../shared/components/FormElements/Form';
import styled from 'styled-components';
import { useHttp } from '../../shared/hooks/useHttp';
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner';
import ErrorModal from '../../shared/components/UIElements/ErrorModal';
import { AuthContext } from '../../shared/context/auth-context';

const EditPlace = () => {
  const { placeid } = useParams();

  const redirect = useNavigate();

  const auth = useContext(AuthContext);

  const [place, setPlace] = useState();

  const { loading, error, sendRequest, clearError } = useHttp();

  const fetchPlace = async () => {
    try {
      const fetchedPlace = await sendRequest(`/api/places/${placeid}`);
      setPlace(fetchedPlace);
      setFormData(
        {
          title: {
            value: fetchedPlace.title,
            isValid: true,
          },
          description: {
            value: fetchedPlace.description,
            isValid: true,
          },
        },
        true
      );
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchPlace();
  }, [placeid, setFormData]);

  const [formState, inputHandler, setFormData] = useForm(
    {
      title: {
        value: '',
        isValid: false,
      },
      description: {
        value: '',
        isValid: false,
      },
    },
    false
  );

  if (loading) {
    return <LoadingSpinner />;
  }

  if (!place && !error) {
    return (
      <NoPlaces>
        <h2>Could not find the place!</h2>
      </NoPlaces>
    );
  }

  const placeUpdateHandler = async (event) => {
    event.preventDefault();
    try {
      await sendRequest(
        `/api/places/${placeid}`,
        'PATCH',
        JSON.stringify({
          title: formState.inputs.title.value,
          description: formState.inputs.description.value,
        }),
        {
          'Content-Type': 'application/json',
        }
      );
      redirect(`/${auth.user.id}/places`);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      {error && <ErrorModal error={error} onClear={clearError} />}
      <Form onSubmit={placeUpdateHandler}>
        <Input
          id="title"
          element="input"
          type="text"
          label="Title"
          validators={[VALIDATOR_REQUIRE()]}
          errorText="Please enter a valid title."
          onInput={inputHandler}
          value={formState.inputs.title.value}
          valid={formState.inputs.title.isValid}
        />
        <Input
          id="description"
          element="textarea"
          label="Description"
          validators={[VALIDATOR_MINLENGTH(10)]}
          errorText="Please enter a valid description. (At least 10 characters)"
          onInput={inputHandler}
          value={formState.inputs.description.value}
          valid={formState.inputs.description.isValid}
        />
        <StyledButton type="submit" disabled={!formState.isValid}>
          Save changes
        </StyledButton>
      </Form>
    </>
  );
};
export default EditPlace;

const NoPlaces = styled.div`
  margin: 7rem auto 0 auto;
  text-align: center;
  width: 25rem;

  & h2 {
    color: white;
  }
`;

const StyledButton = styled(Button)`
  @media (max-width: 768px) {
    margin-top: 8rem;
    height: auto;
    width: 100%;
  }
`;
