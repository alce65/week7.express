import { Types } from 'mongoose';

export type ProtoNote = {
    title?: string;
    author?: string;
    isImportant?: boolean;
};

export type Note = {
    id: Types.ObjectId;
    title: string;
    author: string;
    isImportant: boolean;
};
