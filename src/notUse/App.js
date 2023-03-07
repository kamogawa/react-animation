import styled, { keyframes } from "styled-components";

const Wrapper = styled.div`
  display: flex;
  height: 100vh;
  width: 100vh;
  justify-content: center;
  align-items: center;
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

const Emoji = styled.span`
  font-size: 36px;
`;

const Box = styled.div`
  background-color: ${(props) => props.bgColor};
  height: ${(props) => props.height};
  width: ${(props) => props.width};
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 20px;
  animation: ${rotationAnimation} 1s linear infinite;
  ${Emoji} {
    font-size: 36px;
    &:hover {
      font-size: 75px;
    }
    &:active {
      opacity: 0;
    }
  }
`;
const Input = styled.input.attrs(props => ({
  maxLength: props.test ? 5 :10,
}));

const Circle = styled(Box)`
  border-radius: 50px;
`;

function App() {
  return (
    <Wrapper as="header">
      <Box bgColor="palegreen" height="100px" width="100px">
        <Emoji>🤩</Emoji>
      </Box>
      <Box bgColor="palegreen" height="100px" width="100px">
        <Emoji as="p">🤩</Emoji>
      </Box>
      <Circle bgColor="teal" height="200px" width="200px">
        <span>😍</span>
      </Circle>
      <Input />
      <Input test/>
    </Wrapper>
  );
}

export default App;
