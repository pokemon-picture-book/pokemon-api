import { query } from 'express-validator';

export const langQueryValidator = query('lang')
    .isIn(['en', 'ja-Hrkt'])
    .withMessage('Select en or ja-Hrkt as the "lang"')
    .optional();

export default {};
