import { param } from 'express-validator';

export const idParamsValidator = param('id')
    .isInt({
        min: 1,
        max: Number.MAX_SAFE_INTEGER,
    })
    .withMessage(
        `Specify an integer between 1 and ${Number.MAX_SAFE_INTEGER} for the the id.`
    );

export default {
    idParamsValidator,
};
