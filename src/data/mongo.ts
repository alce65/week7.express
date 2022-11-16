import * as dotenv from 'dotenv'; // see https://github.com/motdotla/dotenv#how-do-i-use-dotenv-with-import
dotenv.config({ path: '../../.env' });
import mongoose, { Schema, model } from 'mongoose';
const uri = `mongodb+srv://${process.env.USER}:${process.env.PASSW}@${process.env.CLUSTER}/?retryWrites=true&w=majority`;

// const taskSchema = new Schema({
//     title: String,
//     responsible: String,
//     isCompleted: Boolean,
// });

(async () => {
    const conector = await mongoose.connect(uri);
    // console.log(conector);

    console.log(mongoose.connection.readyState);

    // const Task = model('Task', taskSchema, 'tasks');

    // await Task.create({
    //     title: 'Probando',
    //     responsible: 'Pepe',
    //     isCompleted: false,
    // });
    // new Task({ title: 'Probando', responsible: 'Pepe', isCompleted: false });
    conector.disconnect();
    console.log(mongoose.connection.readyState);
})();
