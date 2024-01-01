'use client'

import { UploadCloudIcon } from 'lucide-react'
import { getDownloadUrl } from '@edgestore/react/utils'
import * as React from 'react'
import { useDropzone } from 'react-dropzone'
import { cn } from '@/lib/utils'
import { DropzoneInputProps } from './FileDropzone.types'
import { ERROR_MESSAGES, dropzoneVariants } from './FileDropzone.config'
import { CloseIcon } from '@/icons'

export const FileDropzone = React.forwardRef<
  HTMLInputElement,
  DropzoneInputProps
>(
  (
    {
      dropzoneOptions,
      fileName,
      fileUrl,
      className,
      disabled,
      onChange,
      name,
      label,
    },
    ref
  ) => {
    // dropzone configuration
    const {
      getRootProps,
      getInputProps,
      fileRejections,
      isDragAccept,
      isDragReject,
    } = useDropzone({
      multiple: false,
      disabled,
      onDrop: (acceptedFiles) => {
        const file = acceptedFiles[0]
        if (file) {
          void onChange?.(file)
        }
      },
      ...dropzoneOptions,
    })

    // styling
    const dropZoneClassName = React.useMemo(
      () =>
        cn(
          dropzoneVariants.base,
          disabled && dropzoneVariants.disabled,
          fileName && dropzoneVariants.base,
          (isDragReject ?? fileRejections[0]) && dropzoneVariants.reject,
          isDragAccept && dropzoneVariants.accept,
          fileName && dropzoneVariants.fileLoaded,
          className
        ).trim(),
      [
        fileName,
        fileRejections,
        isDragAccept,
        isDragReject,
        disabled,
        className,
      ]
    )

    // error validation messages
    const errorMessage = React.useMemo(() => {
      if (fileRejections[0]) {
        const { errors } = fileRejections[0]
        if (errors[0]?.code === 'file-too-large') {
          return ERROR_MESSAGES.fileTooLarge(dropzoneOptions?.maxSize ?? 0)
        } else if (errors[0]?.code === 'file-invalid-type') {
          return ERROR_MESSAGES.fileInvalidType()
        } else if (errors[0]?.code === 'too-many-files') {
          return ERROR_MESSAGES.tooManyFiles(dropzoneOptions?.maxFiles ?? 0)
        } else {
          return ERROR_MESSAGES.fileNotSupported()
        }
      }
      return undefined
    }, [fileRejections, dropzoneOptions])

    return (
      <div className="flex flex-col">
        <label htmlFor={name} className="pb-1 text-[12px] lg:text-[14px]">
          {label}
        </label>
        <div
          {...getRootProps({
            className: dropZoneClassName,
          })}
        >
          <input ref={ref} id={name} name={name} {...getInputProps()} />

          <div className="flex flex-col items-center justify-center text-xs text-gray-400">
            <UploadCloudIcon className="mb-2 h-7 w-7" />
            <div className="text-gray-400">drag & drop or click to upload</div>
          </div>
        </div>

        {fileUrl && fileName && !disabled && (
          <div className="text-sm mt-2 flex items-center">
            <a
              href={getDownloadUrl(fileUrl, fileName)}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400"
            >
              {fileName}
            </a>
            <div
              className="ml-2 cursor-pointer"
              onClick={() => {
                void onChange?.(undefined)
              }}
            >
              <CloseIcon width={16} height={16} className="text-gray-500" />
            </div>
          </div>
        )}

        <div className="mt-1 text-xs text-red-500">{errorMessage}</div>
      </div>
    )
  }
)

FileDropzone.displayName = 'FileDropzone'
