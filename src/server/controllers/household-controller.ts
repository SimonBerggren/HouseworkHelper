import express from 'express';

import { authenticate } from '../authentication/authentication';
import { findHousehold } from '../utils/mongo-utils';
import { badRequest } from '../error';

const router = express.Router();

router.get('/', authenticate(), async (req, res) => {

    const { email } = req.user as Household;

    try {
        const household = await findHousehold({ email });
        return res.json(household);
        
    } catch (error) {
        return badRequest(res, error);
    }
});

export default router;