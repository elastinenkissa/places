import { useReducer, useEffect } from "react";
import styled from "styled-components";

import { validate } from "../../../util/validators";

const inputReducer = (state, action) => {
  switch (action.type) {
    case "CHANGE":
      return {
        ...state,
        value: action.val,
        isValid: validate(action.val, action.validators),
      };
    case "TOUCH":
      return {
        ...state,
        isTouched: true,
      };
    default:
      return state;
  }
};

const Input = (props) => {
  const [inputState, dispatch] = useReducer(inputReducer, {
    value: props.value || '',
    isTouched: false,
    isValid: props.valid || false,
  });

  const { id, onInput } = props;
  const { value, isValid } = inputState;

  useEffect(() => {
    onInput(id, value, isValid);
  }, [id, value, isValid, onInput]);

  const changeHandler = (event) => {
    dispatch({
      type: "CHANGE",
      val: event.target.value,
      validators: props.validators,
    });
  };

  const touchHandler = () => {
    dispatch({ type: "TOUCH" });
  };

  const element =
    props.element === "input" ? (
      <input
        id={props.id}
        type={props.type}
        placeholder={props.placeholder}
        onChange={changeHandler}
        onBlur={touchHandler}
        value={inputState.value}
      />
    ) : (
      <textarea
        id={props.id}
        rows={props.rows || 3}
        onChange={changeHandler}
        onBlur={touchHandler}
        value={inputState.value}
      />
    );

  return (
    <>
      <CustomInput invalid={!inputState.isValid && inputState.isTouched}>
        <label htmlFor={props.id}>{props.label}</label>
        {element}
        {!inputState.isValid && inputState.isTouched && (
          <p>{props.errorText}</p>
        )}
      </CustomInput>
    </>
  );
};

const CustomInput = styled.div`
  margin: 1rem 0;

  & label,
  & input,
  & textarea {
    display: block;
  }

  & label {
    font-weight: bold;
    margin-bottom: 0.5rem;
  }

  & input,
  & textarea {
    width: 100%;
    font: inherit;
    border: 1px solid #ccc;
    background: #f8f8f8;
    padding: 0.15rem 0.25rem;
  }

  & input:focus,
  & textarea:focus {
    outline: none;
    background: #ebebeb;
    border-color: #510077;
  }

  & label,
  & p {
    color: ${(props) => props.invalid && "red"};
  }

  & input,
  & textarea {
    border-color: ${(props) => props.invalid && "red"};
    background: ${(props) => props.invalid && "#ffd1d1"};
  }
`;

export default Input;
