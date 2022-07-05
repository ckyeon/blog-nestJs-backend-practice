import { join } from 'path';
import { ConfigFactory, ConfigModule } from '@nestjs/config';
import { validationSchema } from './validation-schema';
import authConfig from './auth.config';
import adminConfig from './admin.config';
import multerConfig from './multer.config';

const load: ConfigFactory[] = [authConfig, adminConfig, multerConfig];

export default ConfigModule.forRoot({
  envFilePath: [join(__dirname, '../../config', `.${process.env.NODE_ENV || 'development'}.env`)],
  isGlobal: true,
  load: load,
  validationSchema
});
