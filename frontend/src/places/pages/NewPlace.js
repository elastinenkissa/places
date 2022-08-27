import Input from "../../shared/components/FormElements/Input";
import Button from "../../shared/components/FormElements/Button";

import { VALIDATOR_MINLENGTH, VALIDATOR_REQUIRE } from "../../util/validators";
import { useForm } from "../../shared/hooks/useForm";
import Form from "../../shared/components/FormElements/Form";
import styled from "styled-components";

const NewPlace = () => {
  const [formState, inputHandler] = useForm(
    {
      title: {
        value: "",
        isValid: false,
      },
      description: {
        value: "",
        isValid: false,
      },
    },
    false
  );

  const addNewPlaceHandler = (event) => {
    event.preventDefault();
    console.log(formState.inputs);
  };

  return (
    <>
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
