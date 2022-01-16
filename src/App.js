import styled, { keyframes } from "styled-components";

const Wrapper = styled.div`
  display: flex;
`;

const rotationAnimation = keyframes`
  0% {
    transform:rotate(0deg);
    border-radius:0px;
  }
  50% {
    border-radius:100px;
  }
  100%{
    transform:rotate(360deg);
    border-radius:0px;
  }
`;
const Box = styled.div`
  background-color: ${(props) => props.bgColor};
  height: ${(props) => props.height};
  width: ${(props) => props.width};
  display: flex;
  justify-content: center;
  align-items: center;
  animation: ${rotationAnimation} 1s linear infinite;
  span {
    font-size: 36px;
    &:hover {
      font-size: 75px;
    }
    &:active {
      opacity: 0;
    }
  }
`;
const Circle = styled(Box)`
  border-radius: 50px;
`;

const Input = styled.input.attrs({ required: true })`
  background-color: tomato;
`;

function App() {
  return (
    <Wrapper as="header">
      <Box bgColor="palegreen" height="100px" width="100px">
        <span>🤩</span>
      </Box>
      <Circle bgColor="teal" height="200px" width="200px">
        <span>😍</span>
      </Circle>
    </Wrapper>
  );
}

export default App;
