import { createLogger, format, transports, Logger } from 'winston';
import { Format } from 'logform';

import moment = require('moment');

const consoleAlignedWithColorsAndTime: Format = format.combine(
  format.colorize(),
  format.timestamp(),
  format.align(),
  format.printf(info => {
    const { level, message, ...args } = info;

    const ts: string = moment().format('YYYY-MM-DD HH:mm:ss');
    return `${ts} [${level}]: ${message} ${
      Object.keys(args).length ? JSON.stringify(args, null, 2) : ''
    }`;
  })
);

const fileAlignedWithColorsAndTime: Format = format.combine(
  format.colorize(),
  format.timestamp(),
  format.align(),
  format.printf(info => {
    const { level, message, ...args } = info;

    const ts: string = moment().format('YYYY-MM-DD HH:mm:ss');
    return `${ts} ${message} ${
      Object.keys(args).length ? JSON.stringify(args, null, 2) : ''
    }`;
  })
);

const logger: Logger = createLogger({
  transports: [
    new transports.Console({
      level: 'debug',
      format: consoleAlignedWithColorsAndTime
    }),
    new transports.File({
      filename: `application.log`,
      level: 'info',
      format: fileAlignedWithColorsAndTime
    })
  ]
});

export default logger;
