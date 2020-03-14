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
    userName: string;
    points: number;
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
    userName: string;
}

interface UpdateUserRequest {
    newUserName: string;
    oldUserName: string;
}

interface DeleteUserRequest {
    userName: string;
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
