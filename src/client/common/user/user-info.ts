import { emitEvent } from '../../app/event-manager';
import { storage } from './authentication';

const userKey = 'hwhUser';

export const setUser = (user: User) => {
    storage.setItem(userKey, JSON.stringify(user));
    emitEvent('userChanged', user);
};

export const unsetUser = () => {
    storage.removeItem(userKey);
    emitEvent('userChanged', undefined);
};

export const getUser = () => {
    const storageItem = storage.getItem(userKey);
    if (storageItem) {
        return JSON.parse(storageItem) as User;
    }
};

export const addUserPoints = (userPoints: number) => {
    const user = getUser();
    if (user) {
        user.points += userPoints;
        setUser(user);
    }
};