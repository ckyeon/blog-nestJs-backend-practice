import { Injectable } from '@nestjs/common';
import { FileRefType, IFile } from '../types/file';
import { InjectModel } from '@nestjs/mongoose';
import { File, FileDocument } from './schema/file.schema';
import { Model } from 'mongoose';

@Injectable()
export class UploadsService {
  constructor(@InjectModel(File.name) private readonly fileModel: Model<FileDocument>) {
  }

  async uploadFile(file: Express.Multer.File, userId: string): Promise<IFile> {
    const fileDocument = await this.fileModel.create({
      filename: file.originalname,
      key: file.filename,
      mimetype: file.mimetype,
      size: file.size,
      creator: userId
    });
    return fileDocument;
  }

  async uploadFiles(files: Array<Express.Multer.File>, userId: string): Promise<IFile[]> {
    return Promise.all(
      files.map((file) =>
        this.fileModel.create({
          filename: file.originalname,
          key: file.filename,
          mimetype: file.mimetype,
          size: file.size,
          creator: userId
        })
      )
    );
  }

  async insertRef(attachments: string[], ref: string, refType: FileRefType): Promise<void> {
    const exFiles = await Promise.all(attachments.map((fileId) => this.fileModel.findById(fileId)));
    await Promise.all(
      exFiles.map((file) => {
        file.ref = ref;
        file.refType = refType;
        return file.save();
      })
    );
  }

  async updateRef(attachments: string[], ref: string, refType: FileRefType): Promise<void> {
    const diff = (arr1, arr2) => arr1.filler((element) => !arr2.includes(element));

    const exFilesId = (await this.fileModel.find({ ref: ref })).map((fileDocument) => String(fileDocument._id));
    const additions = diff(attachments || [], exFilesId);
    const deletions = diff(exFilesId, attachments || []);

    await Promise.all([
      this.fileModel.updateMany(
        { _id: { $in: additions } },
        { $set: { ref: ref, refType: refType } }
      ),
      this.fileModel.updateMany(
        { _id: { $in: deletions } },
        { $set: { ref: null, refType: null } }
      )
    ]);
  }
}
