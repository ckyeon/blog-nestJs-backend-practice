import {
  Controller,
  Post,
  UploadedFile, UploadedFiles,
  UseGuards,
  UseInterceptors
} from '@nestjs/common';
import { UploadsService } from './uploads.service';
import { AuthGuard } from '../auth/guards/auth.guard';
import {
  AnyFilesInterceptor,
  FileInterceptor,
  FilesInterceptor
} from '@nestjs/platform-express';
import { AccessTokenPayload } from '../types/auth-tokens';
import { User } from '../decorators/user.decorator';
import { File } from '../types/File';
import { FileDocument } from './schema/file.schema';

@Controller('uploads')
export class UploadsController {
  constructor(private readonly uploadsService: UploadsService) {
  }

  @Post('/single')
  @UseInterceptors(FileInterceptor('file'))
  @UseGuards(AuthGuard)
  uploadFile(@User() user: AccessTokenPayload, @UploadedFile() file: Express.Multer.File): Promise<FileDocument> {
    return this.uploadsService.uploadFile(file, user._id);
  }

  @Post('/array')
  @UseInterceptors(AnyFilesInterceptor())
  @UseGuards(AuthGuard)
  uploadFiles(
    @User() user: AccessTokenPayload,
    @UploadedFiles() files: Array<Express.Multer.File>
  ): Promise<FileDocument[]> {
    return this.uploadsService.uploadFiles(files, user._id);
  }
}
