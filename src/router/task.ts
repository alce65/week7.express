import { Router } from 'express';
import { TaskController } from '../controllers/tasks.js';
import { TaskFileData } from '../data/tasks.file.data.js';

export const taskRouter = Router();

const controller = new TaskController(new TaskFileData());

taskRouter.get('/', controller.getAll.bind(controller));
// taskRouter.get('/', (req, resp) => controller.getAll(req, resp));
taskRouter.get('/:id', controller.get.bind(controller));
taskRouter.post('/', controller.post.bind(controller));
taskRouter.patch('/:id', controller.patch.bind(controller));
taskRouter.delete('/:id', controller.delete.bind(controller));
