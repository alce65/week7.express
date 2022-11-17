import { NextFunction, Request, Response } from 'express';
import { Data } from '../data/data.js';
import { HTTPError } from '../interfaces/error.js';

export abstract class Controller<T> {
    data: T | Array<T>;
    constructor(public dataModel: Data<T>) {
        this.data = [];
    }
    async getAll(req: Request, resp: Response, next: NextFunction) {
        try {
            this.data = await this.dataModel.getAll();
            return true;
        } catch (error) {
            const httpError = new HTTPError(
                503,
                'Service unavailable',
                (error as Error).message
            );
            next(httpError);
            return false;
        }
    }

    async get(req: Request, resp: Response, next: NextFunction) {
        try {
            this.data = await this.dataModel.get(req.params.id);
            return true;
        } catch (error) {
            next(this.#createHttpError(error as Error));
            return false;
        }
    }

    async post(req: Request, resp: Response, next: NextFunction) {
        if (!req.body.title) {
            const httpError = new HTTPError(
                406,
                'Not Acceptable',
                'Title not included in the data'
            );
            next(httpError);
            return true;
        }
        try {
            this.data = await this.dataModel.post(req.body);
            return true;
        } catch (error) {
            const httpError = new HTTPError(
                503,
                'Service unavailable',
                (error as Error).message
            );
            next(httpError);
            return false;
        }
    }

    async patch(req: Request, resp: Response, next: NextFunction) {
        try {
            this.data = await this.dataModel.patch(req.params.id, req.body);
            return true;
        } catch (error) {
            next(this.#createHttpError(error as Error));
            return false;
        }
    }

    async delete(req: Request, resp: Response, next: NextFunction) {
        try {
            await this.dataModel.delete(req.params.id);
            resp.json({});
        } catch (error) {
            next(this.#createHttpError(error as Error));
            return;
        }
    }

    #createHttpError(error: Error) {
        if ((error as Error).message === 'Not found id') {
            const httpError = new HTTPError(
                404,
                'Not Found',
                (error as Error).message
            );
            return httpError;
        }
        const httpError = new HTTPError(
            503,
            'Service unavailable',
            (error as Error).message
        );
        return httpError;
    }
}
