import { NextFunction, Request, Response } from 'express';
import { Data } from '../data/data.js';
import { HTTPError } from '../interfaces/error.js';
import { Note } from '../interfaces/note.js';
import { Controller } from './all.js';

export class NotesController extends Controller<Note> {
    constructor(public dataModel: Data<Note>) {
        super(dataModel);
    }
    async getAll(req: Request, resp: Response, next: NextFunction) {
        if (!(await super.getAll(req, resp, next))) return false;
        resp.json({ notes: this.data });
        return true;
    }

    async get(req: Request, resp: Response, next: NextFunction) {
        if (!(await super.get(req, resp, next))) return false;
        resp.json({ note: this.data });
        return true;
    }

    async post(req: Request, resp: Response, next: NextFunction) {
        if (!req.body.title) {
            const httpError = new HTTPError(
                406,
                'Not Acceptable',
                'Title not included in the data'
            );
            next(httpError);
            return false;
        }
        if (!(await super.post(req, resp, next))) return false;
        resp.json({ note: this.data });
        return true;
    }

    async patch(req: Request, resp: Response, next: NextFunction) {
        if (!(await super.patch(req, resp, next))) return false;
        resp.json({ note: this.data });
        return true;
    }
}
