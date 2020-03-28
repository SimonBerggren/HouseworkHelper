import { Response as IResponse } from 'express';

const errorRequest = (response: IResponse, code: number, error: any) =>
    response.status(code).json(error);

export const badRequest = (response: IResponse, error: any) => {
    console.log(error);
    return errorRequest(response, 400, error);
};