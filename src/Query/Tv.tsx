const BASE_PATH = "https://api.themoviedb.org/3";
const API_KEY = process.env.REACT_APP_API_KEY;

export interface ITv {
  id: number;
  name: string;
  backdrop_path: string;
  overview: string;
}

export interface IGetTvResult {
  page: number;
  results: ITv[];
  total_pages: number;
  total_results: number;
}

export function getTv() {
  return fetch(`${BASE_PATH}/tv/popular?api_key=${API_KEY}&language=en-US`).then(
    (response) => response.json()
  );
}