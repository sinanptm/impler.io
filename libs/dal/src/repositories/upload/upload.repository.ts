import { BaseRepository } from '../base-repository';
import { UploadEntity } from './upload.entity';
import { Upload } from './upload.schema';

export class UploadRepository extends BaseRepository<UploadEntity> {
  constructor() {
    super(Upload, UploadEntity);
  }

  async getUploadInformation(uploadId: string): Promise<UploadEntity> {
    return await Upload.findById(uploadId).populate('_allDataFileId', 'path name');
  }
  async getUploadInvalidDataInformation(uploadId: string): Promise<UploadEntity> {
    return await Upload.findById(uploadId).populate('_invalidDataFileId', 'path name');
  }
  async getUploadProcessInformation(uploadId: string): Promise<UploadEntity> {
    return await Upload.findById(uploadId)
      .populate('_invalidDataFileId', 'path name')
      .populate('_validDataFileId', 'path name');
  }
  async getUploadWithTemplate(uploadId: string, fields: string[]): Promise<UploadEntity> {
    return await Upload.findById(uploadId).populate('_templateId', fields.join(' '));
  }
}
