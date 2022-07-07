import { Inject, Injectable, Logger } from '@nestjs/common';
import { InjectConnection } from '@nestjs/mongoose';
import { Connection } from 'mongoose';
import multerConfig from '../config/multer.config';
import { ConfigType } from '@nestjs/config';
import MulterConfig from '../config/multer.config';
import { Cron, SchedulerRegistry } from '@nestjs/schedule';
import { join } from 'path';
import { promises } from 'fs';

@Injectable()
export class TaskService {
  constructor(
    @InjectConnection() private readonly connection: Connection,
    @Inject(multerConfig.KEY) private readonly config: ConfigType<typeof MulterConfig>,
    private readonly schedulerRegistry: SchedulerRegistry,
    private readonly logger: Logger
  ) {
  }

  @Cron('* 0 * * * *', {
    name: 'unused file deletion',
    timeZone: 'Asia/Seoul'
  })
  async handleSchedule() {
    const { FileModel } = this.connection.models;
    const beforeHour = new Date();
    beforeHour.setHours(beforeHour.getHours() - 1);
    const unusedFiles = await FileModel.find({
      refType: null,
      createdAt: { $lte: beforeHour }
    });

    const fileDeletionPromises = unusedFiles.map((file) => {
      const { key } = file;
      const filePath = join(this.config.dest, key);
      return promises.rm(filePath);
    });

    const dbDeletionPromises = unusedFiles.map((file) => {
      return FileModel.findByIdAndDelete(file._id);
    });

    await Promise.all([...fileDeletionPromises, ...dbDeletionPromises]);

    this.logger.debug(`Delete ${unusedFiles.length} Files`);
  }
}
