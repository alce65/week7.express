import mongoose, { Schema, model } from 'mongoose';
import { Coffee, ProtoCoffee } from '../entities/coffee.js';
import { Data, id } from './data.js';

export class CoffeeRepository implements Data<Coffee> {
    #schema = new Schema({
        name: {
            type: String,
            required: true,
            unique: true,
        },
        color: String,
        taste: String,
        isExtra: Boolean,
    });
    #Model = model('Coffee', this.#schema, 'coffees');

    constructor() {
        this.#schema.set('toJSON', {
            transform: (_document, returnedObject) => {
                returnedObject.id = returnedObject._id;
                delete returnedObject.__v;
                delete returnedObject._id;
            },
        });
    }

    async getAll(): Promise<Array<Coffee>> {
        return this.#Model.find();
    }
    async get(id: id): Promise<Coffee> {
        const result = await this.#Model.findById(id); //as Coffee;
        if (!result) throw new Error('Not found id');
        return result as Coffee;
    }

    async post(data: ProtoCoffee): Promise<Coffee> {
        const result = await this.#Model.create(data);
        return result as Coffee;
    }
    async patch(id: id, data: Partial<Coffee>): Promise<Coffee> {
        const result = await this.#Model.findByIdAndUpdate(id, data, {
            new: true,
        });
        if (!result) throw new Error('Not found id');
        return result as Coffee;
    }

    async delete(id: id): Promise<void> {
        const result = await this.#Model.findByIdAndDelete(id);
        if (result === null) throw new Error('Not found id');
        return;
    }

    #disconnect() {
        mongoose.disconnect();
        console.log(mongoose.connection.readyState);
    }

    getModel() {
        return this.#Model;
    }
}
