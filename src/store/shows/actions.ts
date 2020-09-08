import { Show } from "../../types/Show";
import { ShowsActionTypes, UPDATE_SHOW, REMOVE_SHOW } from "./types";

export const updateShow = (show: Show): ShowsActionTypes => ({
  type: UPDATE_SHOW,
  payload: { show },
});

export const removeShow = (id: number): ShowsActionTypes => ({
  type: REMOVE_SHOW,
  payload: { id },
});
