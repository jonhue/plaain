import { Movie } from "../../types/media_items/Movie";

export const UPDATE_MOVIE = "UPDATE_MOVIE";
export const REMOVE_MOVIE = "REMOVE_MOVIE";

export interface MoviesState {
  [id: number]: Movie | undefined;
}

interface UpdateMovieAction {
  type: typeof UPDATE_MOVIE;
  payload: {
    movie: Movie;
  };
}

interface RemoveMovieAction {
  type: typeof REMOVE_MOVIE;
  payload: {
    id: number;
  };
}

export type MoviesActionTypes = UpdateMovieAction | RemoveMovieAction;
