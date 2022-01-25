import { useQuery } from "react-query";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { fetchCoins, ICoin } from "../api";
import OverviewItem from "./component/OverviewItem";

const Container = styled.div`
  padding: 0px 20px;
  max-width: 1000px;
  margin: 0 auto;
`;

const Header = styled.header`
  height: 15vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Coin = styled.div`  
  display: flex;
  flex-direction: column;
  background-color: white;
  color: ${(props) => props.theme.bgColor};
  border-radius: 15px;
  margin: 10px;
  width: 300px;
  a {
    display: flex;
    align-items: center;
    padding: 20px;
    transition: color 0.2s ease-in;
  }
  &:hover {
    a {
      color: ${(props) => props.theme.accentColor};
    }
  }
`;

const CoinsList = styled.span`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
`;

const Title = styled.h1`
  font-size: 48px;
  color: ${(props) => props.theme.accentColor};
`;

const Loader = styled.span`
  text-align: center;
  display: block;
`;

const Img = styled.img`
  width: 35px;
  height: 35px;
  margin-right: 10px;
`;

const Price = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 20px;
  width: 260px;
  height: 70px;
  background-color: whitesmoke;
  margin-top: -5px;
  margin-left: 20px;
  margin-bottom: 20px;
  border-radius: 5px;
`;


function Coins() {
  const { isLoading, data: allCoins } = useQuery<ICoin[]>("allCoins", fetchCoins);

  return (
    <Container>
      <Header>
        <Title>Coins</Title>
      </Header>
      {isLoading ? (
        <Loader>Loading...</Loader>
      ) : (
        <CoinsList>
          {allCoins?.slice(0, 18).map((coin) => (
            <Coin key={coin.id}>
              <Link to={{ pathname: `/${coin.id}`, state: { name: coin.name }}}>
                <Img src={`https://cryptoicon-api.vercel.app/api/icon/${coin.symbol.toLowerCase()}`} />
                {coin.name} &rarr;
              </Link>
              <Price>
                <OverviewItem title="price" item={32232131.11} column={2}/>
                <OverviewItem title="24H Change %" item="+4.2%" column={2}/>
              </Price>
            </Coin>
          ))}
        </CoinsList>
      )}
    </Container>
  );
}

export default Coins;