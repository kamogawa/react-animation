import styled from "styled-components";

const Wrapper = styled.div`
  display: flex;
  height: 100vh;
  width: 100vh;
  justify-content: center;
  align-items: center;
  background-color: ${(props) => props.theme.backgroundColor};
`;

const Title = styled.h1`
  color: ${(props) => props.theme.textColor};
`;

function ThemeApp() {
  return (
    <Wrapper as="header">
      <Title>Hello</Title>
    </Wrapper>
  );
}

export default ThemeApp;
