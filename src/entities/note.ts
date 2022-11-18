import { Types } from 'mongoose';

export type ProtoNote = {
    title?: string;
    author?: string;
    isImportant?: boolean;
};

export type Note = {
    id: string; // Types.ObjectId;
    title: string;
    author: string;
    isImportant: boolean;
};
