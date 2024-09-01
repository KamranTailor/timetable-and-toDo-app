import express from 'express';
import fs from 'fs/promises';
import { v4 as uuidv4 } from 'uuid';
const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const fileContentConfig = await fs.readFile('./database/config.json', 'utf-8');
        const config = JSON.parse(fileContentConfig);
        const week = config.week;
        let file = "";
        if (week == "One") {
            file = "./database/weekOne.json";
        } else if (week == "Two") { 
            file = "./database/weekOne.json";
        }
        const fileContent = await fs.readFile(file, 'utf-8');
        res.json({data: await JSON.parse(fileContent)});
    } catch (err) { 
        console.error(`Error reading file: ${err.message}`);
        res.status(500).send('Error reading file');
    }
});

export default router;