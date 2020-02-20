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

interface Task {
    points: number;
    email: string;
    name: string;
    frequency: string;
    description?: string;
}

interface CompletedTask {
    points: number;
    email: string;
    name: string;
    userName: string;
}