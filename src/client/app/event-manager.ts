type EventType = 'authenticateChanged' | 'userChanged';
type Callback = (data?: any) => void;

const listeners: { [key: string]: (Callback[] | undefined) } = {};

export const addEventListener = (event: EventType, callback: Callback) => {
    let eventListeners = listeners[event];
    if (!eventListeners) {
        eventListeners = listeners[event] = [];
    }
    eventListeners.push(callback);
};

export const removeEventListener = (event: EventType, callback: Callback) => {
    let eventListeners = listeners[event];
    if (eventListeners) {
        const filteredListeners = eventListeners.filter(eventListener => eventListener === callback);
        if (filteredListeners.length) {
            listeners[event] = filteredListeners;
        } else {
            listeners[event] = undefined;
        }
    }
};

export const emitEvent = (event: EventType, data?: any) => {
    let eventListeners = listeners[event];
    if (eventListeners) {
        eventListeners.forEach(eventListener => eventListener(data));
    }
};