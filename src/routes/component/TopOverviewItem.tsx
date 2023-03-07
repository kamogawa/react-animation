//사용중지

import { useQuery } from "react-query";
import styled from "styled-components";
import { fetchCoinTickerDetail, PriceData } from "../../api";

interface TopOverviewProps {
  coinId: string;
}
interface RateProps {
  color: string;
}

const Loader = styled.span`
  text-align: center;
  display: block;
`;

const Overview = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 40%;
  span:first-child {
    font-size: 12px;
    font-weight: 400;
    text-transform: uppercase;
    margin-bottom: 5px;
  }
`;
const Price = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 20px;
  width: 260px;
  height: 90px;
  background-color: gainsboro;
  margin-top: -5px;
  margin-left: 20px;
  margin-bottom: 20px;
  border-radius: 5px;
`;
const Rate = styled.span<RateProps>`
  color: ${(props) => props.color};
  font-weight: 400;
`;

function TopOverviewItem({ coinId }: TopOverviewProps) {
  const { isLoading, data } = useQuery<PriceData>(
    ["tickers", coinId],
    () => fetchCoinTickerDetail(coinId),
    // {
    //   refetchInterval: 60000,
    // }
  );
  const rateOneDay = data?.quotes.USD.percent_change_24h || 0;
  const change_price =  rateOneDay < 0 ? 'red' : rateOneDay === 0 ? 'black' : 'limegreen';

  return (
    <Price>
      {isLoading ? (
        <Loader>Loading...</Loader>
      ) : ( 
        <>
          <Overview>
            <span>price</span>
            <span>${data?.quotes.USD?.price.toFixed(2)}</span>
          </Overview>
          <Overview>
            <span>24H Change</span>
            <Rate color={change_price}>{data?.quotes.USD.percent_change_24h} %</Rate>
          </Overview>
        </>
      )}
    </Price>
  );
}

export default TopOverviewItem;
