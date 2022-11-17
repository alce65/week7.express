import { Router } from 'express';
import { CoffeeController } from '../controllers/coffee.js';
import { CoffeeRepository } from '../data/coffee.repository.js';

export const coffeeRouter = Router();

const controller = new CoffeeController(new CoffeeRepository());

coffeeRouter.get('/', controller.getAll.bind(controller));
// Alternativa: aprovechar el lexical scope de las arrow functions
// taskRouter.get('/', (req, resp) => controller.getAll(req, resp));
coffeeRouter.get('/:id', controller.get.bind(controller));
coffeeRouter.post('/', controller.post.bind(controller));
coffeeRouter.patch('/:id', controller.patch.bind(controller));
coffeeRouter.delete('/:id', controller.delete.bind(controller));
