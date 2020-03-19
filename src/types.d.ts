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
}

interface Task {
    points: number;
    taskName: string;
    frequency: string;
    desc?: string;
    visibleTo: string[];
}

interface CompletedTask {
    householdID: string;
    taskID: string;
    userID: string;
    date: number;
}

interface CreateUserRequest {
    user: User;
}

interface UpdateUserRequest {
    userToUpdate: string;
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
    userName: string;
}
