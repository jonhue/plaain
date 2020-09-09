import React from 'react'
import { File } from '../types/files/File'

type FileListProps = {
  files: File[]
}

const FileList = ({ files }: FileListProps) => (
  <div className="FileList">
    {files.map((file, index) => {
      return (
        <p className="small" key={index}>
          {file.name}
        </p>
      )
    })}
    {files.length === 0 && <p className="small">-</p>}
  </div>
)

export default FileList
