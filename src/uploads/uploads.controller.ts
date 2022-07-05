import {
  Controller,
  Post,
  UploadedFile,
  UseGuards,
  UseInterceptors
} from '@nestjs/common';
import { UploadsService } from './uploads.service';
import { AuthGuard } from '../auth/guards/auth.guard';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { IAccessTokenPayload } from '../types/auth-tokens';
import { User } from '../decorators/user.decorator';
import { IFile } from '../types/file';

@Controller('upload')
export class UploadsController {
  constructor(private readonly uploadsService: UploadsService) {
  }

  @Post('/single')
  @UseInterceptors(FileInterceptor('file'))
  @UseGuards(AuthGuard)
  uploadFile(@User() user: IAccessTokenPayload, @UploadedFile() file: Express.Multer.File): Promise<IFile> {
    return this.uploadsService.uploadFile(file, user._id);
  }

  @Post('/array')
  @UseInterceptors(FilesInterceptor('files'))
  @UseGuards(AuthGuard)
  uploadFiles(@User() user: IAccessTokenPayload, @UploadedFile() files: Array<Express.Multer.File>) {
    return this.uploadsService.uploadFiles(files, user._id);
  }
}
