import { useQueries, useQuery } from "react-query";
import styled from "styled-components";
import { getTv, IGetTvResult } from "../Query/Tv";
import { makeImagePath } from "../utils";
import TvSlider from "../Components/TvSlider";

const Wrapper = styled.div`
  background: black;
  /* padding-bottom: 200px; */
`;

const Loader = styled.div`
  height: 20vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Banner = styled.div<{ bgPhoto: string }>`
  height: 95vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 60px;
  background-image: linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 1)),
    url(${(props) => props.bgPhoto});
  background-size: cover;
`;

const Title = styled.h2`
  font-size: 68px;
  margin-bottom: 20px; ;
`;

const Overview = styled.p`
  font-size: 30px;
  width: 50%;
`;

function Tv() {
  const { data, isLoading } = useQuery<IGetTvResult>(
    ["tv", "popular"],
    getTv
  );

  const result = useQueries([
    {
      queryKey: ["tv"],
      queryFn: getTv
    },
    {
      queryKey: ["tv2"],
      queryFn: getTv
    }
  ]);

  return (
    <Wrapper>
      {isLoading ? (
          <Loader>Loading...</Loader>
        ) : (<>
          <Banner
            bgPhoto={makeImagePath(data?.results[0].backdrop_path || "")}
          >
            <Title>{data?.results[0].name}</Title>
            <Overview>{data?.results[0].overview}</Overview>
          </Banner>
          { result[0].data ? <TvSlider results={result[0].data.results} sliceStart={1} sliderNo={1} /> : null }
          {/* { result[1].data ? <TvSlider results={result[1].data.results} sliceStart={0} sliderNo={2} /> : null } */}
        </>)}
      {}
    </Wrapper>
  );
}
export default Tv;