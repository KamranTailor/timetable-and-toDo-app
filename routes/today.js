import express from 'express';
import fs from 'fs/promises';
import { v4 as uuidv4 } from 'uuid';
const router = express.Router();


import { getDayOfWeekInLowercase } from './../functions/getDayOfWeekInLowecase.js';

router.get('/', async (req, res) => {
    try {
        // Read and parse configuration file
        const fileContentConfig = await fs.readFile('./database/config.json', 'utf-8');
        const config = JSON.parse(fileContentConfig);
        const week = config.week;
        
        // Determine the correct file based on the week configuration
        let file = "";
        if (week === "One") {
            file = "./database/weekOne.json";
        } else if (week === "Two") {
            file = "./database/weekTwo.json";
        } else {
            throw new Error("Unknown week configuration");
        }
        
        // Read and parse the schedule file
        const fileContent = await fs.readFile(file, 'utf-8');
        const data = JSON.parse(fileContent);
        
        // Get the current day of the week
        const dayOfWeek = getDayOfWeekInLowercase()
        // Check if the current day is in the schedule and send the response
        res.json({ schedule: data, dayOfWeek: dayOfWeek, week: week});

    } catch (err) {
        console.error(`Error reading file: ${err.message}`);
        res.status(500).send('Error reading file');
    }
});

export default router;