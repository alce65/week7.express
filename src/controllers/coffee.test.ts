import { NextFunction, Request, Response } from 'express';
import { CoffeeRepository } from '../data/coffee.repository';
import { CoffeeController } from './coffee';

jest.mock('../data/coffee.repository');

describe('Given CoffeeController', () => {
    CoffeeRepository.prototype.getAll = jest.fn().mockResolvedValue(['mocha']);
    const repository = new CoffeeRepository();

    const coffeeController = new CoffeeController(repository);
    const req: Partial<Request> = {};
    const resp: Partial<Response> = {
        json: jest.fn(),
    };
    const next: NextFunction = jest.fn();
    test('Then ... getAll', async () => {
        await coffeeController.getAll(req as Request, resp as Response, next);
        expect(resp.json).toHaveBeenCalledWith({ coffees: ['mocha'] });
    });
});
