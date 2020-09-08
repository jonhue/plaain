import { File, FileType } from "./File";

const VTT_EXTENSION = "vtt";

type FILE_EXTENSION = typeof VTT_EXTENSION;

export interface Caption extends File {
  type: typeof FileType.Caption;
  fileExtension: FILE_EXTENSION;
}
