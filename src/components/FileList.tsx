import { File } from '../types/files/File'
import React from 'react'
import { useTranslation } from 'react-i18next'

type FileListProps = {
  files: File[]
}

const FileList = ({ files }: FileListProps) => {
  const { t } = useTranslation()

  return (
    <div className="FileList">
      {files.map((file, index) => {
        return (
          <p className="small" key={index}>
            {file.name}
          </p>
        )
      })}
      {files.length === 0 && <p className="small">{t('None')}</p>}
    </div>
  )
}

export default FileList
