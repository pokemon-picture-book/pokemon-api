import { query } from 'express-validator';
import { LIMIT_MAX_NUM } from '@/01-enterprise/constant/pagination';

export const limitQueryValidator = query('limit')
    .isInt({ min: 1, max: LIMIT_MAX_NUM })
    .withMessage(
        `Specify an integer between 1 and ${LIMIT_MAX_NUM} for the the limit.`
    )
    .optional();

export const offsetQueryValidator = query('offset')
    .isInt({ min: 1, max: Number.MAX_SAFE_INTEGER })
    .withMessage(
        `Specify an integer between 1 and ${Number.MAX_SAFE_INTEGER} for the the offset.`
    )
    .optional();

export default {};
