import mongoose from 'mongoose';
import { dbConnect } from '../db.conect';
import { CoffeeRepository } from './coffee.repository';

const mockData = [
    {
        name: 'mocka',
        color: 'más negro',
        taste: 'muy rico',
        isExtra: true,
    },
    {
        name: 'expersso',
        color: 'negro',
        taste: 'muy rico',
        isExtra: true,
    },
];

describe('Given ...', () => {
    const repository = new CoffeeRepository();
    let testIds: Array<string>;
    beforeAll(async () => {
        await dbConnect();
        await repository.getModel().deleteMany();
        await repository.getModel().insertMany(mockData);
        const data = await repository.getModel().find();
        testIds = [data[0].id, data[1].id];
    });

    test('Then getAll...', async () => {
        const result = await repository.getAll();
        expect(result[0].name).toEqual(mockData[0].name);
    });

    test('Then post ...', async () => {
        const newCoffee = {
            name: 'arabica',
        };
        const result = await repository.post(newCoffee);
        expect(result.name).toEqual(newCoffee.name);
    });

    test('Then delete ...', async () => {
        const result = await repository.delete(testIds[0]);
        expect(result).toEqual(testIds[0]);
    });

    test('Then delete ...', async () => {
        expect(async () => {
            await repository.delete(1);
        }).rejects.toThrowError(mongoose.Error.CastError);
    });

    test('Then delete ...', async () => {
        expect(async () => {
            await repository.delete('537b422da27b69c98b1916e1');
        }).rejects.toThrowError(Error);
    });

    afterAll(async () => {
        await mongoose.disconnect();
    });
});
