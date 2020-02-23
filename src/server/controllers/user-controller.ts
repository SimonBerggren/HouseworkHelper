import express from 'express';

import UserModel from '../model/user.model';

import { authenticate } from '../authentication/authentication';
import { getHousehold } from '../utils/mongo-utils';
import { badRequest } from '../error';

const router = express.Router();

// create new user
router.post('/', authenticate(), async (req, res) => {

    const householdID = getHousehold(req).id;

    const { userName } = req.body as CreateUserRequest;

    try {
        const createdUser = await UserModel.create({ householdID, name: userName });
        return res.json(createdUser);

    } catch (error) {
        return badRequest(res, error);
    }
});

// get users within a household
router.get('/', authenticate(), async (req, res) => {

    const householdID = getHousehold(req).id;

    try {
        const users = await UserModel.find({ householdID });
        return res.json(users);

    } catch (error) {
        return badRequest(res, error);
    }
});

// delete user from a household
router.delete('/', authenticate(), async (req, res) => {

    const { email, name } = req.body as Household;

    try {
        const deletedUser = await UserModel.findOneAndDelete({ email, name });
        return res.json(deletedUser);

    } catch (error) {
        return badRequest(res, error);
    }
});


// get users within a household
// not protected so should only be active during development
// or add protection before production
router.get('/:email/:name', async (req, res) => {

    const email = req.params.email;
    const name = req.params.name;

    try {
        const user = await UserModel.findOne({ email, name });
        return res.json(user);

    } catch (error) {
        return badRequest(res, error);
    }
});

// get users within a household
// not protected so should only be active during development
router.get('/:email', async (req, res) => {

    const email = req.params.email;

    try {
        const users = await UserModel.find({ email });
        return res.json(users);

    } catch (error) {
        return badRequest(res, error);
    }
});

export default router;