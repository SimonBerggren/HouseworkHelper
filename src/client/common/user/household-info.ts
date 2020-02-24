import { getTasks, getHousehold, getCompletedTasks } from '../api-operations';

let completedTasks: CompletedTask[] = [];
let houseHoldName: string = '';
let householdTasks: Task[] = [];

export const populateHouseholdInfo = () => {
    getHousehold().then(household => houseHoldName = household.householdName);
    getCompletedTasks().then(tasks => completedTasks = tasks);
    getTasks().then(tasks => householdTasks = tasks);
};

export const emptyHouseholdInfo = () => {
    completedTasks = [];
    houseHoldName = '';
    householdTasks = [];
};

export const getHouseholdCompletedTasks = () => completedTasks;
export const getHouseholdTasks = () => householdTasks;
export const getHouseholdName = () => houseHoldName;
