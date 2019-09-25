export const SETTINGS_UPDATE = 'SETTINGS_UPDATE'

export const updateSettings = settings => ({
  type: SETTINGS_UPDATE,
  payload: settings
})
