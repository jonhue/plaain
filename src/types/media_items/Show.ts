import { MediaItem, MediaItemType } from "./MediaItem";

export interface Show extends MediaItem {
  type: typeof MediaItemType.Show;
  title: string;
}
