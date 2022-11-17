import mongoose, { Schema, model } from 'mongoose';
import { Note, ProtoNote } from '../interfaces/note';
import { Data, id } from './data';

export class NotesMongoData implements Data<Note> {
    #schema = new Schema({
        title: String,
        author: String,
        isImportant: Boolean,
    });
    #Model = model('Note', this.#schema, 'notes');

    async getAll(): Promise<Array<Note>> {
        return this.#Model.find();
    }
    async get(id: id): Promise<Note> {
        const result = await this.#Model.findById(id); //as Note;
        if (!result) throw new Error('Not found id');
        return result as Note;
    }

    async post(data: ProtoNote): Promise<Note> {
        const result = await this.#Model.create(data);
        // Una alternativa menos testeable es
        // new Task(data);
        return result as Note;
    }
    async patch(id: id, data: Partial<Note>): Promise<Note> {
        const result = await this.#Model.findByIdAndUpdate(id, data, {
            new: true,
        });
        if (!result) throw new Error('Not found id');
        return result as Note;
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
}
