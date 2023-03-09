import styled from "styled-components";

interface OverviewProps {
  title: string;
  item: string | number | undefined;
}

const Overview = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 33%;
  span:first-child {
    font-size: 12px;
    font-weight: 400;
    text-transform: uppercase;
    margin-bottom: 5px;
  }
`;

function OverviewItem({ title, item }: OverviewProps) {
  return <Overview><span>{title}</span><span>{item}</span></Overview>
}

export default OverviewItem;
