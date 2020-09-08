import { Episode } from "../../types/Episode";
import { EpisodesActionTypes, UPDATE_EPISODE, REMOVE_EPISODE } from "./types";

export const updateEpisode = (episode: Episode): EpisodesActionTypes => ({
  type: UPDATE_EPISODE,
  payload: { episode },
});

export const removeEpisode = (id: number): EpisodesActionTypes => ({
  type: REMOVE_EPISODE,
  payload: { id },
});
