import { NextFunction, Request, Response } from 'express';
import { Data } from '../data/data.js';
import { Task } from '../interfaces/task.js';

export class TaskController {
    constructor(public dataModel: Data<Task>) {}

    async getAll(req: Request, resp: Response) {
        const data = await this.dataModel.getAll();
        resp.json(data).end();
    }

    get(req: Request, resp: Response) {
        //
    }

    post(req: Request, resp: Response) {
        // const newTask = {
        //     ...req.body,
        //     id: this.data.length + 1,
        // };
        // this.data.push(newTask);
        // resp.json(newTask);
        // resp.end();
    }

    patch(req: Request, resp: Response) {
        // const updateTask = {
        //     ...this.data.find((item) => item.id === +req.params.id),
        //     ...req.body,
        // };
        // this.data[this.data.findIndex((item) => item.id === +req.params.id)] =
        //     updateTask;
        // resp.json(updateTask);
        // resp.end();
    }

    delete(req: Request, resp: Response, next: NextFunction) {
        // if (!this.data.find((item) => item.id === +req.params.id)) {
        //     next(new Error('Not found'));
        //     return;
        // }
        // this.data = this.data.filter((item) => item.id !== +req.params.id);
        // resp.json({});
        // resp.end();
    }
}
