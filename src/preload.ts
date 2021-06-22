import * as dotenv from 'dotenv';
import 'reflect-metadata';
import 'module-alias/register';

dotenv.config();

process.on('unhandledRejection', (reason, p) => {
  console.error('Unhandled Rejection at: Promise', p, 'reason:', reason);
});
