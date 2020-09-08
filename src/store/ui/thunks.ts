import { asyncBegin, asyncEnd, updateError } from "./actions";
import { AppThunk } from "../index";

export const load = (
  f: AppThunk<Promise<void>>
): AppThunk<Promise<void>> => async (dispatch) => {
  dispatch(asyncBegin());

  try {
    await dispatch(f);
  } catch (error: unknown) {
    console.log("error", error);

    if (error instanceof Error) {
      dispatch(updateError(error));
    }
  }

  dispatch(asyncEnd());
};
