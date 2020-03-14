import { emitEvent } from '../../app/event-manager';
import { storage } from './authentication';

const userNameKey = 'hwhUserName';
const userPointsKey = 'hwhUserPoints';

export const setUser = ({ userName, points }: User) => {
    setUserName(userName);
    setUserPoints(points);
};

export const unsetUser = () => {
    storage.removeItem(userNameKey);
    emitEvent('userNameChanged', '');
};

export const setUserName = (userName: string) => {
    storage.setItem(userNameKey, userName);
    emitEvent('userNameChanged', userName);
};

export const getUserName = (): string =>
    storage.getItem(userNameKey) || '';


export const setUserPoints = (userPoints: number) => {
    storage.setItem(userPointsKey, userPoints.toString());
    emitEvent('userPointsChanged', userPoints);
};

export const addUserPoints = (userPoints: number) => {
    const addedPoints = getUserPoints() + userPoints;
    storage.setItem(userPointsKey, addedPoints.toString());
    emitEvent('userPointsChanged', addedPoints);
};


export const getUserPoints = (): number =>
    storage.getItem(userPointsKey) ? parseInt(storage.getItem(userPointsKey) as string) : 0;