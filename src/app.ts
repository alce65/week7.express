import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import { Task } from './interfaces/task';
import importData from './mock/data.json' assert { type: 'json' };

export const app = express();
const data: Array<Task> = importData.tasks;

app.use(morgan('dev'));
app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.send('Hello World!');
    res.end();
});

app.get('/tasks', (req, res) => {
    res.json(data);
    res.end();
});

app.post('/tasks', (req, res) => {
    const newTask = {
        ...req.body,
        id: data.length + 1,
    };
    data.push(newTask);
    res.json(newTask);
    res.end();
});
