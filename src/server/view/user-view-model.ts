class UserViewModel implements User {
    password: string | undefined;
    profilePicture: number;
    isHonest: boolean;
    userName: string;
    points: number;
    isKid: boolean;

    constructor(user: User) {
        this.password = user.password ? '********' : undefined;
        this.profilePicture = user.profilePicture;
        this.userName = user.userName;
        this.isHonest = user.isHonest;
        this.points = user.points;
        this.isKid = user.isKid;
    }
}

export default UserViewModel;