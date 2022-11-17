import fs from 'fs/promises';
import * as dotenv from 'dotenv'; // see https://github.com/motdotla/dotenv#how-do-i-use-dotenv-with-import
dotenv.config();
import { Task } from '../interfaces/task.js';
import { Data, id } from './data.js';

export class TaskFileData implements Data<Task> {
    dataFileURL: string;
    constructor() {
        this.dataFileURL = process.env.DATA_FILE || '';
    }

    async getAll(): Promise<Array<Task>> {
        return this.#readData().then((data) => data.tasks as Array<Task>);
    }

    async get(id: id): Promise<Task> {
        return this.#readData()
            .then((data) => data.tasks as Array<Task>)
            .then((data) => {
                const item = data.find((item) => item.id === id);
                if (!item) throw new Error('Not found id');
                return item;
            });
    }

    async post(newTask: Partial<Task>): Promise<Task> {
        const aData = await this.getAll();
        const finalTask = { ...(newTask as Task), id: this.#createID() };
        aData.push(finalTask);
        await this.#saveData(aData);
        return finalTask;
    }

    async patch(id: id, updateTask: Partial<Task>): Promise<Task> {
        const aData = await this.getAll();
        const index = aData.findIndex((item) => item.id === id);
        if (!index) throw new Error('Not found id');
        aData[index] = {
            ...aData[index],
            ...updateTask,
        };
        await this.#saveData(aData);
        return aData[index];
    }

    async delete(id: id): Promise<void> {
        const aData = await this.getAll();
        const index = aData.findIndex((item) => item.id === id);
        if (index < 0) throw new Error('Not found id');
        const finalData = aData.filter((item) => item.id !== id);
        await this.#saveData(finalData);
    }

    #createID() {
        return Math.trunc(Math.random() * 1_000_000_000);
    }

    #readData() {
        return fs
            .readFile(this.dataFileURL, 'utf-8')
            .then((data) => JSON.parse(data));
    }

    async #saveData(data: Array<Task>) {
        const initialData = await this.#readData();
        const finalData = {
            ...initialData,
            tasks: data,
        };
        return fs.writeFile(this.dataFileURL, JSON.stringify(finalData));
    }
}
