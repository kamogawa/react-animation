import { useQuery } from "react-query";
import { fetchCoinHistory, IHistorical } from "../api";
import ApexChart from "react-apexcharts";
import { useRecoilValue } from "recoil";
import { isDarkAtom } from "../atoms";
import styled from "styled-components";

interface ChartProps {
  coinId: string;
}
function Chart({ coinId }: ChartProps) {
  const isDark = useRecoilValue(isDarkAtom);
  const { isLoading, data } = useQuery<IHistorical[]>(["ohlcv", coinId], () =>
    fetchCoinHistory(coinId)
  );

  const Loader = styled.span`
    position: relative;
    font-size: 20px;
    text-align: center;
    height: 90vh;
    color: ${(props) => props.theme.contrastTextColor};
    font-weight: bolder;
  `;

  return (
    <div>
      {isLoading ? (
        <Loader>Loading...</Loader>
      ) : (
        <ApexChart
          type="candlestick"
          series={[
            {
              name: "Price",
              data: data?.map((price) => {
                return {
                  x: new Date(price.time_open),
                  y: [price.open, price.high, price.low, price.close]
                }
              
              }),
            },
          ]}
          options={{
            theme: {
              mode: isDark ? "dark" : "light",
            },
            chart: {
              height: 300,
              width: 500,
              toolbar: {
                show: false,
              },
              background: "transparent",
            },
            grid: { show: false },
            yaxis: {
              show: false,
            },
            xaxis: {
              type: "datetime",
              categories: data?.map((price) => price.time_close),
            }
          }}
          height={350}
        />
      )}
    </div>
  );
}

export default Chart;