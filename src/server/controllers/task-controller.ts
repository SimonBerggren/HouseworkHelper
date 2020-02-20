import express from 'express';

import HouseholdModel from '../model/household-model';

import { authenticate } from '../authentication';
import TaskModel from '../model/task-model';

const router = express.Router();

// get tasks from a household
router.get('/', authenticate(), async (req, res) => {

    const { email } = req.user as Household;

    HouseholdModel.findOne({ email })
        .then(household => {

            if (household) {
                return TaskModel.find({ email })
                    .then(tasks => res.json(tasks));
            }
        })
        .catch(error => res.status(401).json(error));
});

// create new task
router.post('/', authenticate(), async (req, res) => {

    const { name, email, description, points, frequency } = req.body as Task;

    HouseholdModel.findOne({ email })
        .then(household => {

            if (household) {
                TaskModel.findOne({ name, email })
                    .then(task => {

                        if (task) {
                            return res.status(401).json('Task with that name already exists');
                        } else {
                            return TaskModel.create({ name, email, description, points, frequency })
                                .then(createdTask => res.json(createdTask))
                                .catch(error => res.status(401).json(error));
                        }
                    });
            } else {
                return res.status(401).json('Could not find household');
            }
        })
        .catch(error => res.status(401).json(error));
});

router.delete('/', async (req, res) => {
    const { email, name } = req.body as Task;

    HouseholdModel.findOne({ email })
        .then(household => {
            if (household) {
                TaskModel.findOneAndDelete({ email, name })
                    .then(task => res.json(task));
            } else {
                res.status(401).json('Could not find household');
            }
        })
        .catch(error => res.status(401).json(error));
});

// get tasks from a household
// not protected so should only be active during development
router.get('/:email', async (req, res) => {

    const email = req.params.email;

    HouseholdModel.findOne({ email })
        .then(household => {

            if (household) {
                return TaskModel.find({ email })
                    .then(tasks => res.json(tasks));
            }

            return res.status(401).json('Could not find household');
        })
        .catch(error => res.status(401).json(error));
});

export default router;