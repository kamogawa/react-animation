import styled from "styled-components";

interface OverviewProps {
  title: string;
  item: string | number;
  column: number;
}
interface OverviewStyle {
  case: string;
}

const Overview = styled.div<OverviewStyle>`
display: flex;
flex-direction: column;
align-items: center;
/* width: 33%; */
width: ${(props) => props.case};
span:first-child {
  font-size: 12px;
  font-weight: 400;
  text-transform: uppercase;
  margin-bottom: 5px;
}
`;

function OverviewItem({ title, item, column }: OverviewProps) {
  return <Overview case={column == 3 ? "33%" : "40%"} ><span>{title}</span><span>{item}</span></Overview>
}

export default OverviewItem;
