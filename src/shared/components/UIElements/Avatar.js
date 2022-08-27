import styled from "styled-components";

const Avatar = (props) => {
  return (
    <AvatarContainer>
      <img
        src={props.image}
        alt={props.alt}
        style={{ width: props.width, heitght: props.width }}
      />
    </AvatarContainer>
  );
};

const AvatarContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;

  & img {
    display: block;
    border-radius: 50%;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

export default Avatar;
