import * as dotenv from 'dotenv'
dotenv.config();
import bodyParser from 'body-parser';
import express from 'express'

const app = express();
const port = 3001;
import db from "./config/connection";
import association  from './model/associations';
import studentRouter from './routes/student.router';
import trainerRouter from './routes/trainer.router';

app.use(bodyParser.json())
app.use(express.json());
app.use("/student", studentRouter);
app.use("/trainer", trainerRouter);


association()
db.sync({force: true})
    .then((value) => {
        console.log('All models were synchronized successfully.');
        
    })
    .catch((error) => {
        console.error('An error occurred while synchronizing models:', error);
    });

app.listen(port, () => {
    console.log(`listening on ${port}`);
    //console.log(process.env.HOST);
})

