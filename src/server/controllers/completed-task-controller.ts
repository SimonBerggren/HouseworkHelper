import express from 'express';

import CompletedTaskModel from '../model/completed-task-model';
import HouseholdModel from '../model/household-model';

import { authenticate } from '../authentication';
import UserModel from '../model/user.model';

const router = express.Router();

// get all completed tasks in household
router.get('/', authenticate(), async (req, res) => {

    const { email } = req.user as Household;

    HouseholdModel.findOne({ email })
        .then(household => {

            if (household) {
                return CompletedTaskModel.find({ email })
                    .then(tasks => res.json(tasks));
            }
        })
        .catch(error => res.status(401).json(error));
});

// complete task
router.post('/:userName', authenticate(), async (req, res) => {

    const userName = req.params.userName;
    const { name, email, points } = req.body as CompletedTask;
    
    HouseholdModel.findOne({ email })
        .then(household => {

            if (household) {

                UserModel.findOne({ email, name: userName })
                    .then(user => {

                        if (user) {

                            user.points += points;

                            CompletedTaskModel.create({ name, email, points, userName })
                                .then(createdTask => {
                                    user.save();
                                    res.json(createdTask);
                                })
                                .catch(error => res.status(400).json(error));

                        } else {
                            return res.status(401).json('Could not find user ' + userName);
                        }

                    })
                    .catch(error => res.status(401).json(error));

            } else {
                return res.status(401).json('Could not find household');
            }
        })
        .catch(error => res.status(401).json(error));
});

// router.delete('/', async (req, res) => {
//     const { email, name } = req.body as Household;

//     HouseholdModel.findOne({ email })
//         .then(household => {
//             if (household) {
//                 UserModel.findOneAndDelete({ email, name })
//                     .then(user => res.json(user));
//             } else {
//                 res.status(401).json('Could not find household');
//             }
//         })
//         .catch(error => res.status(401).json(error));
// });

// get tasks from a household
// not protected so should only be active during development
router.get('/:email', async (req, res) => {

    const email = req.params.email;

    HouseholdModel.findOne({ email })
        .then(household => {

            if (household) {
                return CompletedTaskModel.find({ email })
                    .then(tasks => res.json(tasks));
            }

            return res.status(401).json('Could not find household');
        })
        .catch(error => res.status(401).json(error));
});

export default router;