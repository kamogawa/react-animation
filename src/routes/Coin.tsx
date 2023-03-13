import { useQuery } from "react-query";
import { Helmet } from "react-helmet";
import {
  Switch,
  Route,
  useLocation,
  useParams,
  useRouteMatch,
} from "react-router-dom";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { fetchCoinTickerDetail, PriceData, InfoData, fetchCoinDetail } from "../api";
import Chart from "./Chart";
import OverviewItem from "./component/OverviewItem";
// import Price from "./Price";
import { ArrowLeftCircle } from "@styled-icons/bootstrap/ArrowLeftCircle";

const Title = styled.h1`
  font-size: 48px;
  color: ${(props) => props.theme.accentColor};
`;

const Loader = styled.span`
  position: relative;
  font-size: 25px;
  text-align: center;
  display: block;
  height: 100vh;
  color: ${(props) => props.theme.contrastTextColor};
  font-weight: bolder;
  span{
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%,-50%);
  }
`;

const Container = styled.div`
  padding: 0px 20px;
  max-width: 480px;
  margin: 0 auto;
`;

const Header = styled.header`
  height: 15vh;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Overview = styled.div`
  display: flex;
  justify-content: space-between;
  background-color: ${(props) => props.theme.cardBgColor};
  padding: 10px 20px;
  border-radius: 10px;
`;

const Description = styled.p`
  margin: 20px 3px;
  color: ${(props) => props.theme.contrastTextColor};
`;

const Tabs = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  margin: 25px 0px;
  gap: 10px;
`;

const Tab = styled.span<{ isActive: boolean }>`
  text-align: center;
  text-transform: uppercase;
  font-size: 12px;
  font-weight: 400;
  background-color: silver;
  padding: 7px 0px;
  border-radius: 10px;
  color: ${(props) =>
    props.isActive ? 'forestgreen' : props.theme.textColor};
  a {
    padding: 7px 0px;
    cursor: ${(props) => props.isActive ? 'not-allowed': 'pointer'};
    display: block;
  }
`;

const BackCoins = styled(ArrowLeftCircle)`
  height: 25px;
  color: ${(props) => props.theme.contrastTextColor};
  &:hover {
    color: ${(props) => props.theme.accentColor};
    cursor: pointer;
  }
`

interface RouteParams {
  coinId: string;
}

interface RouteState {
  name: string;
}

function Coin() {
  const { coinId } = useParams<RouteParams>();
  const { state } = useLocation<RouteState>();
  const priceMatch = useRouteMatch("/coin_tracker/:coinId/price");
  const chartMatch = useRouteMatch("/coin_tracker/:coinId/chart");

  const { isLoading: infoLoading, data: infoData } = useQuery<InfoData>(
    ["info", coinId],
    () => fetchCoinDetail(coinId)
  );
  const { isLoading: tickersLoading, data: tickersData } = useQuery<PriceData>(
    ["tickers", coinId],
    () => fetchCoinTickerDetail(coinId)
  );
  const loading = infoLoading || tickersLoading;

  return (
    <Container>
      <Helmet>
        <title>
          {state?.name ? state.name : loading ? "Loading..." : infoData?.name}
        </title>
      </Helmet>
      <Header>
        <span/>
        <Title>
          {state?.name ? state.name : loading ? "Loading..." : infoData?.name}
        </Title>
        <Link to={`/coin_tracker`}><BackCoins /></Link>
      </Header>
      {loading ? (
        <Loader>Loading...</Loader>
      ) : (
        <>
          <Overview>
            <OverviewItem title="Rank" item={infoData?.rank}/>
            <OverviewItem title="Symbol" item={infoData?.symbol}/>
            <OverviewItem title="Price" item={tickersData?.quotes.USD.price.toFixed(3)}/>
          </Overview>
          <Description>{infoData?.description}</Description>
          <Overview>
            <OverviewItem title="Total Suply" item={tickersData?.total_supply}/>
            <OverviewItem title="Max Supply" item={tickersData?.max_supply}/>
          </Overview>
          {/* Taps */}
          <Tabs>
            <Tab isActive={chartMatch !== null}>
              <Link to={`/coin_tracker/${coinId}/chart`}>Chart</Link>
            </Tab>
            <Tab isActive={priceMatch !== null}>
              <Link to={`/coin_tracker/${coinId}/price`}>Price</Link>
            </Tab>
          </Tabs>
          {/* Route */}
          <Switch>
            <Route path={`/coin_tracker/:coinId/price`}>
              {/* <Price data={tickersData}/> */}
            </Route>
            <Route path={`/coin_tracker/:coinId/chart`}>
              <Chart coinId={coinId} />
            </Route>
          </Switch>
        </>
      )}
    </Container>
  );}

export default Coin;