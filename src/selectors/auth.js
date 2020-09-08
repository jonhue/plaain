import { createSelector } from "reselect";

const authSelector = (state) => state.auth;

export const authProviderSelector = (provider) => {
  return createSelector(authSelector, (auth) => auth[provider]);
};

export const authTokenSelector = (provider) => {
  return createSelector(
    authProviderSelector(provider),
    (authProvider) => authProvider.token
  );
};

export const authError = () => {
  return createSelector(authSelector, (auth) =>
    Object.keys(auth).some((provider) => auth[provider].error !== null)
  );
};

export const authProviderError = (provider) => {
  return createSelector(authSelector, (auth) => auth[provider].error !== null);
};
