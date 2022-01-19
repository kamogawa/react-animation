import { useState } from "react";
import styled from "styled-components";


interface ContainerProps {
    bgColor: string;
    borderColor: string;
  }


const Container = styled.div<ContainerProps>`
  width: 200px;
  height: 200px;
  background-color: ${(props) => props.bgColor};
  border-radius: 100px;
  border: 2px solid ${props => props.borderColor};
  display: flex;
  align-items: center;
  justify-content: center;
`;

interface CircleProps {
    bgColor: string;
    borderColor?: string; // string | undefined
    text?: string;
  }

function Circle({ bgColor, borderColor, text = "default text" }: CircleProps) {
  const [count, setCount] = useState<number|string>("xx");
  setCount("xx");
  setCount(22);

  return <Container bgColor={bgColor} borderColor={borderColor ?? "black"} >
      {text}
  </Container>;
}

export default Circle;
