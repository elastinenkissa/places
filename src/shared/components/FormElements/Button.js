import styled from "styled-components";

const Button = (props) => {
  return (
    <StyledButton className={props.className}
      type={props.type}
      onClick={props.onClick}
      inverse={props.inverse}
      danger={props.danger}
      disabled={props.disabled}
    >
      {props.children}
    </StyledButton>
  );
};

const StyledButton = styled.button`
  font: inherit;
  padding: 0.5rem 1.5rem;
  border: 1px solid #ff0055;
  border-radius: 4px;
  background: ${(props) => {
    if (props.inverse) {
      return `transparent`;
    } else if (props.danger) {
      return `#830000`;
    } else return `#ff0055`;
  }};
  color: ${(props) => (props.inverse ? `#ff0055` : `white`)};
  cursor: pointer;
  margin-right: 1rem;
  text-decoration: none;
  display: inline-block;
  border-color: ${(props) => props.danger && `#830000`};

  &:focus {
    outline: none;
  }

  &:hover,
  &:active {
    color: ${(props) => props.inverse && `white`};
    background: ${(props) => {
        if (props.inverse) {
          return `#ff0055`;
        } else if (props.danger) {
          return `#f34343`;
        } else return `#ff4382`;
      }};
    border-color: ${(props) => (props.danger ? `#f34343` : `#ff4382`)};
  }

  &:disabled,
  &:hover:disabled,
  &:active:disabled {
    background: #ccc;
    color: #979797;
    border-color: #ccc;
    cursor: not-allowed;
  }
`;

export default Button;
