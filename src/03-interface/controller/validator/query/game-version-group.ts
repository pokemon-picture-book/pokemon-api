import { query } from 'express-validator';

export const supportedQueryValidator = query('supported')
    .isBoolean()
    .optional();

export default {};
