// index.js

const version = "V1";

import express from 'express';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import fs from 'fs/promises';
import { v4 as uuidv4 } from 'uuid';

import { getWeekData }from "./functions/getWeekData.js"
import { getDayOfWeekInLowercase } from './functions/getDayOfWeekInLowecase.js';
import { getConfig } from "./functions/getConfig.js"


dotenv.config();
const port =  2020;

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

import weekCodeRouter from './routes/weekCode.js';
app.use('/weekCode', weekCodeRouter);

import chnageWeekRouter from './routes/chnageWeek.js';
app.use('/chnageWeek', chnageWeekRouter);

import thisWeekRouter from './routes/thisWeek.js';
app.use('/thisWeek', thisWeekRouter);

import todayRouter from './routes/today.js';
app.use('/today', todayRouter);

import addItemRouter from './routes/addItem.js';
app.use('/addItem', addItemRouter);

import getToDoRouter from './routes/getToDo.js';
app.use('/getToDo', getToDoRouter);

import deleteItemRouter from './routes/deleteItem.js';
app.use('/deleteItem', deleteItemRouter);

import updateTimeTableRouter from './routes/updateTimeTable.js';
app.use('/updateTimeTable', updateTimeTableRouter);

import lessonsListRouter from './routes/lessonsList.js'
app.use('/lessonsList', lessonsListRouter);

import editLessonsRouter from './routes/saveLessons.js'
app.use('/saveLessons', editLessonsRouter);

app.get('/version', (request, response) => {response.json({version: version})});
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));
app.listen(port, async () => {
    console.log(`Server is running at http://localhost:${port}`);
    try {
      const open = await import('open');
      // Automatically open the default web browser
      open.default(`http://localhost:${port}`);
    } catch (err) {
      console.error('Failed to open browser:', err);
    }
  });