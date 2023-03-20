import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { ArrowLeftCircleFill } from "@styled-icons/bootstrap/ArrowLeftCircleFill";
import { ArrowRightCircleFill } from "@styled-icons/bootstrap/ArrowRightCircleFill";
import styled from "styled-components";
import { ITv } from "../Query/Tv";
import { useHistory, useRouteMatch } from "react-router-dom";
import { makeImagePath } from "../utils";

const Slider = styled.div`
  position: relative;
  top: -100px;
  margin-bottom: 80px;
`;

const Row = styled(motion.div)`
  display: grid;
  gap: 5px;
  grid-template-columns: repeat(6, 1fr);
  position: absolute;
  width: 100%;
`;

const Box = styled(motion.div)<{ bgPhoto: string }>`
  background-color: white;
  background-image: url(${(props) => props.bgPhoto});
  background-size: cover;
  background-position: center center;
  height: 200px;
  font-size: 66px;
  cursor: pointer;
  &:first-child {
    transform-origin: center left;
  }
  &:last-child {
    transform-origin: center right;
  }
`;

const Info = styled(motion.div)`
  padding: 10px;
  background-color: ${(props) => props.theme.black.lighter};
  opacity: 0;
  position: absolute;
  width: 100%;
  bottom: 0;
  h4 {
    text-align: center;
    font-size: 18px;
  }
`;


const Overlay = styled(motion.div)`
  position: fixed;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  opacity: 0;
`;

const BigMovie = styled(motion.div)`
  position: fixed;
  width: 40vw;
  height: 80vh;
  left: 0;
  right: 0;
  margin: 0 auto;
  border-radius: 15px;
  overflow: hidden;
  background-color: ${(props) => props.theme.black.lighter};
`;

const BigCover = styled.div`
  width: 100%;
  background-size: cover;
  background-position: center center;
  height: 400px;
`;

const BigTitle = styled.h3`
  color: ${(props) => props.theme.white.lighter};
  padding: 20px;
  font-size: 46px;
  position: relative;
  top: -80px;
`;

const BigOverview = styled.p`
  padding: 20px;
  position: relative;
  top: -80px;
  color: ${(props) => props.theme.white.lighter};
`;

const RightSlideButton = styled(ArrowRightCircleFill)`
  position: absolute;
  height: 40px;
  right: 0;
  top: 0;
  bottom: 0;
  margin: auto 5px;
  z-index: 99;
  opacity: 0.5;
  cursor: pointer;
  color: ${(props) => props.theme.white.darker};
  &:hover {
    color: ${(props) => props.theme.white.lighter};
    opacity: 1;
  }
`;

const LeftSlideButton = styled(ArrowLeftCircleFill)`
  position: absolute;
  height: 40px;
  left: 0;
  top: 0;
  bottom: 0;
  margin: auto 5px;
  z-index: 99;
  opacity: 0.5;
  cursor: pointer;
  color: ${(props) => props.theme.white.darker};
  &:hover {
    color: ${(props) => props.theme.white.lighter};
    opacity: 1;
  }
`;

const rowVariants = {
  entry: (custom: boolean)=> ({
    x: custom ? window.outerWidth + 5 : -window.outerWidth - 5,
  }),
  center: {
    x: 0,
  },
  exit: (custom: number)=> ({
    x: custom ? -window.outerWidth - 5 : window.outerWidth + 5,
  }),
};

const boxVariants = {
  normal: {
    scale: 1,
  },
  hover: {
    scale: 1.3,
    y: -80,
    transition: {
      delay: 0.5,
      duaration: 0.1,
      type: "tween",
    },
  },
};

const infoVariants = {
  hover: {
    opacity: 1,
    transition: {
      delay: 0.5,
      duaration: 0.1,
      type: "tween",
    },
  },
};

const offset = 6;

interface TvSliderInterface {
  results: ITv[];
  sliceStart: number;
  sliderNo: number;
}

function TvSlider({ results, sliceStart, sliderNo }: TvSliderInterface) {
  const history = useHistory();
  const bigMovieMatch = useRouteMatch<{ tvId: string }>("/react-netflix/tv/:tvId");
  // const { scrollY } = useViewportScroll();

  const [index, setIndex] = useState(0);
  const [back, setBack] = useState(false);
  const [leaving, setLeaving] = useState(false);

  const incraseIndex = () => {
    if (leaving) return;
    toggleLeaving();
    setBack(false);
    const totalMovies = results.length - 1;
    const maxIndex = Math.floor(totalMovies / offset) - 1;
    setIndex((prev) => (prev === maxIndex ? 0 : prev + 1));
  };

  const decraseIndex = () => {
    if (leaving) return;
    toggleLeaving();
    setBack(true);
    const totalMovies = results.length - 1;
    const maxIndex = Math.floor(totalMovies / offset) - 1;
    setIndex((prev) => (prev <= 0 ? maxIndex : prev - 1));
  };

  const toggleLeaving = () => setLeaving((prev) => !prev);
  const onBoxClicked = (tvId: number) => {
    history.push(`/react-netflix/tv/${tvId}`);
  };
  const onOverlayClick = () => history.push("/react-netflix/tv");
  const clickedMovie =
    bigMovieMatch?.params.tvId &&
    results.find((tv) => tv.id === +bigMovieMatch.params.tvId);

  return (
    <>
      <Slider>
        <AnimatePresence custom={back} initial={false} onExitComplete={toggleLeaving}>
          <Row
            custom={back}
            variants={rowVariants}
            initial="entry"
            animate="center"
            exit="exit"
            transition={{ type: "tween", duration: 1 }}
            key={index}
          >
            {results
              .slice(sliceStart)
              .slice(offset * index, offset * index + offset)
              .map((tv) => (
                <Box
                  layoutId={tv.id + "" + sliderNo}
                  key={tv.id}
                  whileHover="hover"
                  initial="normal"
                  variants={boxVariants}
                  onClick={() => onBoxClicked(tv.id)}
                  transition={{ type: "tween" }}
                  bgPhoto={makeImagePath(tv.backdrop_path, "w500")}
                >
                  <Info variants={infoVariants}>
                    <h4>{tv.name}</h4>
                  </Info>
                </Box>
              ))}
            <LeftSlideButton onClick={incraseIndex}>next</LeftSlideButton>
            <RightSlideButton onClick={decraseIndex}>prev</RightSlideButton>
          </Row>
        </AnimatePresence>
      </Slider>
      <AnimatePresence>
        {bigMovieMatch ? (
          <>
            <Overlay
              onClick={onOverlayClick}
              exit={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            />
            <BigMovie
              style={{ top: 100 }}
              layoutId={bigMovieMatch.params.tvId  + "" + sliderNo}
            >
              {clickedMovie && (
                <>
                  <BigCover
                    style={{
                      backgroundImage: `linear-gradient(to top, black, transparent), url(${makeImagePath(
                        clickedMovie.backdrop_path,
                        "w500"
                      )})`,
                    }}
                  />
                  <BigTitle>{clickedMovie.name}</BigTitle>
                  <BigOverview>{clickedMovie.overview}</BigOverview>
                </>
              )}
            </BigMovie>
          </>
        ) : null}
      </AnimatePresence>
    </>
  );

}

export default TvSlider;