interface SignupModel extends Household {
    confirmedPassword: string;
}

interface Household {
    name: string;
    email: string;
    password: string;
}

interface User {
    name: string;
    email: string;
    points: number;
}

interface CreateUserRequest {
    userName: string;
}

interface Task {
    points: number;
    title: string;
    frequency: string;
    desc?: string;
}

interface CompletedTask {
    householdID: string;
    taskID: string;
    userID: string;
    date: number;
}

interface CompleteTaskRequest {
    taskTitle: string;
    userName: string;
}