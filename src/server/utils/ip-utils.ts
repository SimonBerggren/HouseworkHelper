import os from 'os';

const ifaces = os.networkInterfaces();

export const getIP = () => {

    let ip = '';

    Object.keys(ifaces).forEach((ifname) => {
        ifaces[ifname].forEach((iface) => {
            if ('IPv4' !== iface.family || iface.internal !== false) {
                // skip over internal (i.e. 127.0.0.1) and non-ipv4 addresses
                return;
            }

            if (ifname && iface.address) {
                ip = iface.address;
            }
        });
    });

    return ip;
};