import { Season } from "../../types/Season";
import { SeasonsActionTypes, UPDATE_SEASON, REMOVE_SEASON } from "./types";

export const updateSeason = (season: Season): SeasonsActionTypes => ({
  type: UPDATE_SEASON,
  payload: { season },
});

export const removeSeason = (id: number): SeasonsActionTypes => ({
  type: REMOVE_SEASON,
  payload: { id },
});
