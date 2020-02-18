const request = (path: string, method: string, data?: any) =>
    fetch(
        `api/${path}`,
        {
            method,
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'Application/JSON'
            }
        }
    )
        .then(response =>
            response.json().then(json => {
                if (response.ok) {
                    return Promise.resolve(json);
                } else {
                    return Promise.reject(json);
                }

            })
        );

export const get = (path: string) => request(path, 'GET');

export const post = (path: string, data: any) => request(path, 'POST', data);