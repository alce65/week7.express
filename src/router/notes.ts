import { Router } from 'express';
import { NotesController } from '../controllers/notes.js';
import { NotesMongoData } from '../data/notes.mongo.data.js';

export const notesRouter = Router();

const controller = new NotesController(new NotesMongoData());

notesRouter.get('/', controller.getAll.bind(controller));
// Alternativa: aprovechar el lexical scope de las arrow functions
// taskRouter.get('/', (req, resp) => controller.getAll(req, resp));
notesRouter.get('/:id', controller.get.bind(controller));
notesRouter.post('/', controller.post.bind(controller));
notesRouter.patch('/:id', controller.patch.bind(controller));
notesRouter.delete('/:id', controller.delete.bind(controller));
