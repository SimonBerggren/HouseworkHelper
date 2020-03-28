export const validateUser = (user: User) => {

    // if password is falsy, delete it
    // otherwise empty string is saved in db
    if (!user.password) {
        delete user.password;
    } else {
        if (!user.password.trim()) {
            throw 'Invalid password';
        }
    }

};