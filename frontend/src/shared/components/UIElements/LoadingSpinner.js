import styled, { keyframes } from 'styled-components';

const LoadingSpinner = () => {
  return (
    <>
      <Overlay>
        <Ring></Ring>
      </Overlay>
    </>
  );
};

const ringRotation = keyframes`

to {
  transform: rotate(360deg);
}
`;

const Ring = styled.div`
  display: inline-block;
  width: 64px;
  height: 64px;

  &:after {
    content: ' ';
    display: block;
    width: 46px;
    height: 46px;
    margin: 1px;
    border-radius: 50%;
    border: 5px solid #510077;
    border-color: #510077 transparent #510077 transparent;
    animation: ${ringRotation} 1.2s linear infinite;
  }
`;

const Overlay = styled.div`
  height: 100%;
  width: 100%;
  position: absolute;
  top: 0;
  left: 0;
  background: rgba(255, 255, 255);
  display: flex;
  justify-content: center;
  align-items: center;
`;

export default LoadingSpinner;
