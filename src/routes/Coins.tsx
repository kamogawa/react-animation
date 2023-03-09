import styled from "styled-components";
import { useQuery } from "react-query";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import { fetchCoins, ICoin } from "../api";

const Container = styled.div`
  padding: 0px 20px;
  max-width: 1000px;
  margin: 0 auto;
`;

const Coin = styled.div`  
  display: flex;
  flex-direction: column;
  background-color: ${(props) => props.theme.cardBgColor};
  color: ${(props) => props.theme.textColor};
  border-radius: 15px;
  margin: 12px;
  width: 120px;
  border: 1px solid white;
  a {
    flex-direction: column;
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
  margin-top: 20px;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
`;

const Loader = styled.div`
  position: relative;
  font-size: 50px;
  text-align: center;
  height: 90vh;
  color: ${(props) => props.theme.contrastTextColor};
  font-weight: bolder;
  span{
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%,-50%);
  }
`;

const Img = styled.img`
  width: 85px;
  height: 85px;
`;

const CoinName = styled.span`
  margin-top: 10px;
  font-size: 15px;
  font-weight: bold;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  text-align: -webkit-center;
  width: 90px;
  &:hover {
    white-space: normal;
    width: auto;
    overflow: visible;
    text-overflow: clip;
  }
`;

function Coins() {
  const { isLoading: isCoinLoading, data: allCoins } = useQuery<ICoin[]>("allCoins", fetchCoins);

  return (
    <>
      <Container>
        <Helmet>
          <title>Coin Tracker</title>
        </Helmet>
        {isCoinLoading ? (
          <Loader><span>Loading...</span></Loader>
        ) : (
          <CoinsList>
            {allCoins?.slice(0, 100).map((coin) => (
              <Coin key={coin.id}>
                <Link to={{ pathname: `/coin_tracker/${coin.id}`, state: { name: coin.name }}}>
                  <Img src={`https://coinicons-api.vercel.app/api/icon/${coin.symbol.toLowerCase()}`} />
                  <CoinName>{coin.name}</CoinName>
                </Link>
                {/* 무료api에서는 시간당 리퀘스트 제한이 있기 때문에 설정 제외 */}
                {/* <TopOverviewItem coinId={coin.id}/> */}
              </Coin>
            ))}
          </CoinsList>
        )}
      </Container>
    </>
  );
}

export default Coins;