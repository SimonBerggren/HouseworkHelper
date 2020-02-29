type EventType = 'authenticateChanged' | 'userNameChanged';
type Callback = (data?: any) => void;

const allListeners: { [key: string]: (Callback[] | undefined) } = {}

export const addEventListener = (event: EventType, callback: Callback) => {
    let eventListeners = allListeners[event];
    if (!eventListeners) {
        eventListeners = allListeners[event] = [];
    }
    eventListeners.push(callback);
}

export const removeEventListener = (event: EventType, callback: Callback) => {
    let eventListeners = allListeners[event];
    if (eventListeners) {
        const filteredListeners = eventListeners.filter(eventListener => eventListener === callback)
        if (filteredListeners.length) {
            allListeners[event] = filteredListeners;
        } else {
            allListeners[event] = undefined;
        }
    }
}

export const emitEvent = (event: EventType, data?: any) => {
    let eventListeners = allListeners[event];
    if (eventListeners) {
        eventListeners.forEach(eventListener => eventListener(data));
    }
}