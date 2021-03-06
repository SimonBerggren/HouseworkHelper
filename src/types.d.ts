declare module '*.svg';
declare module '*.png'

type Frequency =
    'Daily' |
    'Weekly' |
    'Monthly' |
    'Quaterly' |
    'Semiannually' |
    'Annually';

interface SignupModel extends Household {
}

interface Household {
    householdName: string;
    email: string;
    password: string;
}

interface User {
    profilePicture: number;
    password?: string;
    userName: string;
    points: number;
    isKid: boolean;
    isHonest: boolean;
}

interface Task {
    points: number;
    taskName: string;
    frequency: string;
    desc?: string;
    visibleTo: string[];
    visibleToEveryone: boolean;
}

interface CompletedTask {
    householdID: string;
    taskID: string;
    userID: string;
    date: number;
}

interface Reward {
    points: number;
    rewardName: string;
    desc?: string;
    visibleTo: string[];
    visibleToEveryone: boolean;
}

interface RedeemedReward {
    householdID: string;
    rewardID: string;
    userID: string;
    date: number;
}

interface RequestDoTask {
    deadlineDate?: number;
    deadlineTime?: number;
    fromUserName: string;
    toUserName: string;
    taskName: string;
    comments?: string;
    points: number;
}

interface RequestCompleteTask {
    dateCompleted: number;
    fromUserID: string;
    toUserID: string;
    taskName: string;
}

interface CreateUserRequest {
    user: User;
}

interface UpdateUserRequest {
    userToUpdate: string;
    password?: string;
    user: User;
}

interface DeleteUserRequest {
    userName: string;
    password?: string;
}

interface DeleteTaskRequest {
    taskName: string;
}

interface UpdateTaskRequest {
    taskToUpdate: string;
    task: Task;
}

interface CompleteTaskRequest {
    taskName: string;
}

interface UpdateRewardRequest {
    rewardToUpdate: string;
    reward: Reward;
}

interface DeleteRewardRequest {
    rewardName: string;
}

interface RedeemRewardRequest {
    rewardName: string;
}