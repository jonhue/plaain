import { Provider } from "../../types/providers/Provider";

export const UPDATE_PROVIDER = "UPDATE_PROVIDER";
export const UPDATE_VERSION = "UPDATE_VERSION";
export const REMOVE_PROVIDER = "REMOVE_PROVIDER";

export interface AuthState {
  providers: {
    [id: number]: Provider | undefined;
  };
  version: string;
}

interface UpdateProviderAction {
  type: typeof UPDATE_PROVIDER;
  payload: {
    provider: Provider;
  };
}

interface UpdateVersionAction {
  type: typeof UPDATE_VERSION;
  payload: {
    version: string;
  };
}

interface RemoveProviderAction {
  type: typeof REMOVE_PROVIDER;
  payload: {
    id: number;
  };
}

export type AuthActionTypes =
  | UpdateProviderAction
  | UpdateVersionAction
  | RemoveProviderAction;
