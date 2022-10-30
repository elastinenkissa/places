import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Button from "../../shared/components/FormElements/Button";
import Card from "../../shared/components/UIElements/Card.js";
import Input from "../../shared/components/FormElements/Input";
import { useForm } from "../../shared/hooks/useForm";
import { VALIDATOR_MINLENGTH, VALIDATOR_REQUIRE } from "../../util/validators";
import Form from "../../shared/components/FormElements/Form";
import styled from "styled-components";

const PLACES = [
  {
    id: 1,
    title: "Bazinga Memorial",
    description: "Truly one of the funniest places in existence.",
    imgUrl:
      "https://img-new.cgtrader.com/items/3209261/43d23bcdb1/sheldon-cooper-the-big-bang-theory-3d-model.jpg",
    address: "Chungus Blvd 420",
    location: {
      lng: 7.4543729,
      lat: 45.3141624,
    },
    poster: "u1",
  },
  {
    id: 2,
    title: "Fourth Knight",
    description: "#1 Victory Royale.",
    imgUrl:
      "https://th.bing.com/th/id/R.a2a3c670c26f048d195c5121cbc5137b?rik=LszVjiHUGQ%2bnHQ&riu=http%3a%2f%2fwww.pwrdown.com%2fwp-content%2fuploads%2f2018%2f01%2fEvening_DurrrBurger.jpg&ehk=2r9K%2bCpHKqZTwb0CSOlrfV0w1TB5%2bERzBeesOZstsTU%3d&risl=&pid=ImgRaw&r=0",
    address: "Tomato Town 32",
    location: {
      lng: -93.8867985,
      lat: -11.8782385,
    },
    poster: "u2",
  },
];

const EditPlace = () => {
  const placeId = +useParams().placeid;

  const [isLoading, setIsLoading] = useState(true);

  const identifiedPlace = PLACES.find((place) => place.id === placeId);

  const [formState, inputHandler, setFormData] = useForm(
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

  useEffect(() => {
    setFormData(
      {
        title: {
          value: identifiedPlace.title,
          isValid: true,
        },
        description: {
          value: identifiedPlace.description,
          isValid: true,
        },
      },
      true
    );
    setIsLoading(false);
  }, [setFormData, identifiedPlace]);

  if (!identifiedPlace) {
    return (
      <Card>
        <h2>Could not find the place!</h2>
      </Card>
    );
  }

  const placeUpdateHandler = (event) => {
    event.preventDefault();
    console.log(formState.inputs);
  };

  if (isLoading) {
    return <div style={{ color: "white" }}>Loading...</div>;
  }

  return (
    <>
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

const StyledButton = styled(Button)`
  @media (max-width: 768px) {
    margin-top: 8rem;
    height: auto;
    width: 100%;
  }
`
