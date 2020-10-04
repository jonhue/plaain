export const buildItemId = (tmdbId: number) => `TMDb@${tmdbId}`

const parametrize = (str: string) => str.toLowerCase().replace(/\s/g, '+')

export const buildTrailerUrl = (title: string) =>
  'https://www.youtube.com/results?search_query=' +
  `${parametrize(title)}+official+trailer`
