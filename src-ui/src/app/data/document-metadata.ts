export interface DocumentMetadata {
  original_checksum?: string

  archived_checksum?: string

  original_mime_type?: string

  media_filename?: string

  original_filename?: string

  has_archive_version?: boolean

  lang?: string

  original_metadata?: { namespace: string; prefix: string; key: string; value: string }[]

  archive_metadata?: { namespace: string; prefix: string; key: string; value: string }[]
}
