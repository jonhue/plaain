export const VERSION = '0.0.1'

export const AUTOMATIC_INDEXING = {
  NEVER: 'never',
  MONTHLY: 'monthly',
  DAILY: 'daily',
  ALWAYS: 'always'
}

export const PROVIDERS = {
  MICROSOFT: 'microsoft'
}

export const STORAGE_PROVIDERS = {
  [PROVIDERS.MICROSOFT]: 'OneDrive'
}

export const ITEM_TYPES = {
  MOVIE: 'movie',
  SHOW: 'show',
  SEASON: 'season',
  EPISODE: 'episode'
}

export const FILE_TYPES = {
  SOURCE: 'source',
  CAPTION: 'caption'
}

export const SOURCE_EXTENSIONS = ['mp4', 'm4v', 'mkv', 'webm']
export const CAPTION_EXTENSIONS = ['vtt']
