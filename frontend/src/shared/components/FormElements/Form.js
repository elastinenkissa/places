import React from "react";
import styled from "styled-components";

const Form = (props) => {
  return (
    <StyledForm onSubmit={props.onSubmit} className={props.className}>
      {props.children}
    </StyledForm>
  );
};

const StyledForm = styled.form`
  @media (max-width: 768px) {
    display: flex;
    flex-direction: column;
    text-align: center;
    height: auto;
  }
  list-style: none;
  margin: 0 auto;
  margin-bottom: 5rem;
  padding: 1rem;
  width: 90%;
  max-width: 40rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.26);
  border-radius: 6px;
  background: white;
`;

export default Form;
