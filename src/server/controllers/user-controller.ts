import express from 'express';

import HouseholdModel from '../model/household-model';
import UserModel from '../model/user.model';

import { authenticate } from '../authentication';

const router = express.Router();

// create new user
router.post('/', authenticate(), async (req, res) => {

    const { name, email } = req.body as User;

    HouseholdModel.findOne({ email })
        .then(household => {

            if (household) {
                UserModel.findOne({ name, email })
                    .then(user => {

                        if (user) {
                            return res.status(401).json('User already exists');
                        } else {
                            return UserModel.create({ name, email })
                                .then(() => res.json(req.user));
                        }
                    });
            } else {
                return res.status(401).json('Could not find household');
            }
        })
        .catch(error => res.status(401).json(error));
});

// get users within a household
router.get('/', authenticate(), async (req, res) => {

    const { email } = req.user as Household;

    HouseholdModel.findOne({ email })
        .then(household => {

            if (household) {
                return UserModel.find({ email })
                    .then(users => res.json(users));
            }
        })
        .catch(error => res.status(401).json(error));
});


router.delete('/', authenticate(), async (req, res) => {
    const { email, name } = req.body as Household;

    HouseholdModel.findOne({ email })
        .then(household => {
            if (household) {
                UserModel.findOneAndDelete({ email, name })
                    .then(user => res.json(user));
            } else {
                res.status(401).json('Could not find household');
            }
        })
        .catch(error => res.status(401).json(error));
});


// get users within a household
// not protected so should only be active during development
// or add protection before production
router.get('/:email/:name', async (req, res) => {

    const email = req.params.email;
    const name = req.params.name;

    HouseholdModel.findOne({ email })
        .then(household => {

            if (household) {
                return UserModel.findOne({ email, name })
                    .then(users => res.json(users));
            }

            return res.status(401).json('Could not find household');
        })
        .catch(error => res.status(401).json(error));
});

// get users within a household
// not protected so should only be active during development
router.get('/:email', async (req, res) => {

    const email = req.params.email;

    HouseholdModel.findOne({ email })
        .then(household => {

            if (household) {
                return UserModel.find({ email })
                    .then(users => res.json(users));
            }

            return res.status(401).json('Could not find household');
        })
        .catch(error => res.status(401).json(error));
});

export default router;