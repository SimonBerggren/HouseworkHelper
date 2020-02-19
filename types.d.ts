interface SignupModel extends Household {
    confirmedPassword: string;
}

interface Household {
    name: string;
    email: string;
    password: string;
}