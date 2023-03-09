import styled from "styled-components";
import { PriceData } from "../api";
import OverviewItem from "./component/OverviewItem";

interface PriceProps {
  data?: PriceData;
}

function Price({ data }: PriceProps) {
  const Loader = styled.span`
    position: relative;
    font-size: 20px;
    text-align: center;
    height: 90vh;
    color: ${(props) => props.theme.contrastTextColor};
    font-weight: bolder;
  `;
  const Overview = styled.div`
    display: flex;
    justify-content: space-between;
    background-color: ${(props) => props.theme.cardBgColor};
    padding: 10px 20px;
    border-radius: 10px;
    margin-bottom: 20px;
  `;

  const usd = data?.quotes.USD;
  return (
    <div>
      {typeof usd === "undefined" ? (
        <Loader><span>Loading...</span></Loader>
      ) : (
        <>
          <Overview>
            <OverviewItem title="30 minutes" item={usd.percent_change_30m}/>
            <OverviewItem title="1 hours" item={usd.percent_change_1h}/>
            <OverviewItem title="12 hours" item={usd.percent_change_12h}/>
          </Overview>
          <Overview>
            <OverviewItem title="1 days" item={usd.market_cap_change_24h}/>
            <OverviewItem title="7 days" item={usd.percent_change_7d}/>
            <OverviewItem title="30 days" item={usd.percent_change_30d}/>
          </Overview>
        </>
      )}
    </div>
  );
}

export default Price;
