const request = (path: string, method: string, data?: any) =>
    fetch(
        path,
        {
            method,
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'Application/JSON'
            }
        }
    );

export const get = (path: string) => request(path, 'GET');

export const post = (path: string, data: any) => request(path, 'POST', data);