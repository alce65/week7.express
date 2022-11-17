import mongoose from 'mongoose';
import * as dotenv from 'dotenv'; // see https://github.com/motdotla/dotenv#how-do-i-use-dotenv-with-import
dotenv.config({ path: '../.env' });

export function dbConnect() {
    const DBName = 'Coders2022';
    let uri = `mongodb+srv://${process.env.USER}:${process.env.PASSWD}`;
    uri += `@${process.env.CLUSTER}/${DBName}?retryWrites=true&w=majority`;
    return mongoose.connect(uri);
}
